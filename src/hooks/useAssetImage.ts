import { useState, useEffect, useCallback, useRef } from 'react';

export type AssetLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface UseAssetImageOptions {
  fallbackCandidates?: (string | undefined)[];
  timeoutMs?: number;
}

export interface UseAssetImageResult {
  currentSrc: string;
  status: AssetLoadingStatus;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  onNativeLoad: () => void;
  onNativeError: () => void;
  retry: () => void;
}

// Global session memory cache so previously verified assets load instantaneously without layout shifts
const verifiedAssetCache = new Set<string>();
const failedAssetCache = new Set<string>();

/**
 * useAssetImage: Resilient asset confirmation hook.
 *
 * Coordinates multi-path candidate verification for image assets,
 * ensuring seamless display across dev servers, Cloud Run, Vercel, and static previews.
 */
export function useAssetImage(
  primarySrc: string | undefined,
  options: UseAssetImageOptions = {}
): UseAssetImageResult {
  const { fallbackCandidates = [], timeoutMs = 8000 } = options;

  // Build candidate list (primary + standardized public & relative variants + explicit fallbacks)
  const candidateList: string[] = [];

  const addCandidate = (url: string | undefined) => {
    if (!url || typeof url !== 'string') return;
    const trimmed = url.trim();
    if (!trimmed || candidateList.includes(trimmed)) return;
    candidateList.push(trimmed);
  };

  addCandidate(primarySrc);

  // Generate standard public/relative variants
  if (primarySrc && typeof primarySrc === 'string') {
    const raw = primarySrc.trim();

    // If it's a bundled /assets/ filename with hash, extract the original base filename
    // e.g. /assets/tanjiro_water_dragon_slash_1794421346328-CN8cUsv7.jpg -> tanjiro_water_dragon_slash_1794421346328.jpg
    const match = raw.match(/\/([a-zA-Z0-9_-]+?)(?:-[a-zA-Z0-9_-]{8})?\.(jpg|jpeg|png|webp|svg)$/i);
    if (match) {
      const originalName = `${match[1]}.${match[2]}`;
      addCandidate(`/assets/images/${originalName}`);
      addCandidate(`./assets/images/${originalName}`);
      addCandidate(`assets/images/${originalName}`);
    }

    if (raw.startsWith('/src/assets/images/')) {
      const filename = raw.replace('/src/assets/images/', '');
      addCandidate(`/assets/images/${filename}`);
      addCandidate(`./assets/images/${filename}`);
    } else if (raw.startsWith('/assets/images/')) {
      const filename = raw.replace('/assets/images/', '');
      addCandidate(`./assets/images/${filename}`);
      addCandidate(`/src/assets/images/${filename}`);
    }
  }

  for (const candidate of fallbackCandidates) {
    addCandidate(candidate);
  }

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const activeSrc = candidateList[candidateIndex] || candidateList[0] || '';

  const initialLoaded = activeSrc ? verifiedAssetCache.has(activeSrc) : false;
  const [status, setStatus] = useState<AssetLoadingStatus>(initialLoaded ? 'loaded' : 'loading');

  const prevPrimaryRef = useRef<string | undefined>(primarySrc);
  const isMountedRef = useRef<boolean>(true);

  // Reset candidate index when primarySrc changes
  useEffect(() => {
    if (prevPrimaryRef.current !== primarySrc) {
      prevPrimaryRef.current = primarySrc;
      setCandidateIndex(0);
      if (primarySrc && verifiedAssetCache.has(primarySrc)) {
        setStatus('loaded');
      } else {
        setStatus('loading');
      }
    }
  }, [primarySrc]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const onNativeLoad = useCallback(() => {
    if (!isMountedRef.current) return;
    if (activeSrc) {
      verifiedAssetCache.add(activeSrc);
      if (primarySrc) verifiedAssetCache.add(primarySrc);
    }
    setStatus('loaded');
  }, [activeSrc, primarySrc]);

  const onNativeError = useCallback(() => {
    if (!isMountedRef.current) return;
    if (activeSrc) {
      failedAssetCache.add(activeSrc);
    }
    if (candidateIndex < candidateList.length - 1) {
      setCandidateIndex((prev) => prev + 1);
      setStatus('loading');
    } else {
      setStatus('error');
    }
  }, [activeSrc, candidateIndex, candidateList.length]);

  const retry = useCallback(() => {
    if (primarySrc) failedAssetCache.delete(primarySrc);
    setCandidateIndex(0);
    setStatus('loading');
  }, [primarySrc]);

  // Timeout guard so image never remains stuck in loading
  useEffect(() => {
    if (status !== 'loading') return;

    const timer = setTimeout(() => {
      if (!isMountedRef.current) return;
      if (status === 'loading') {
        // If image hasn't loaded in timeoutMs, try next candidate or show error
        if (candidateIndex < candidateList.length - 1) {
          setCandidateIndex((prev) => prev + 1);
        } else {
          setStatus('error');
        }
      }
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [candidateIndex, candidateList.length, status, timeoutMs]);

  return {
    currentSrc: activeSrc,
    status,
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    isError: status === 'error',
    onNativeLoad,
    onNativeError,
    retry,
  };
}
