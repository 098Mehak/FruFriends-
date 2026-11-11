export interface FruFriendCharacter {
  id: string;
  name: string;
  characterTitle: string;
  anime: string;
  fruit: string;
  fruitEmoji: string;
  flavorProfile: string;
  chocolateShell: string;
  fruitFilling: string;
  mouldingMotif: string;
  sculptedChocolateImage: string;
  miniModelGift: {
    title: string;
    series: string;
    height: string;
    rarity: string;
    specialFeature: string;
    description: string;
    modelImage: string;
  };
  tastingNotes: string[];
  themeColor: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    gradient: string;
  };
  quote: string;
  collectibleRarity: 'Rare' | 'Super Rare' | 'Ultra Rare';
}

export const CHARACTERS: FruFriendCharacter[] = [
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    characterTitle: 'Sunlit Heart & Relentless Resolve',
    anime: 'Demon Slayer',
    fruit: 'Strawberry',
    fruitEmoji: '🍓',
    flavorProfile: 'Bright, sun-ripened strawberry coulis inside deep velvety 64% dark chocolate',
    chocolateShell: '64% Single-Origin Ecuadorian Dark Chocolate Sculpted Head & Kimono',
    fruitFilling: 'Artisanal Amaou Strawberry reduction with crushed berry seeds & ruby berry nectar',
    mouldingMotif: 'Character-sculpted chocolate with burgundy spiky hair, forehead scar & green-black checkered haori',
    sculptedChocolateImage: '/src/assets/images/tanjiro_sculpted_chocolate_1794419625887.jpg',
    miniModelGift: {
      title: 'Tanjiro Kamado · Hinokami Kagura Chibi',
      series: 'FruFriends Series 1 Mini Companions',
      height: '6.8 cm with Gold Crest Stand',
      rarity: 'Ultra Rare (★ 1 of 500)',
      specialFeature: 'Detachable Flaming Blade & Lavender Velvet Display Cushion',
      description: 'Delicately painted miniature figurine with fiery eyes, iconic hanafuda earrings, and miniature display plinth.',
      modelImage: '/src/assets/images/tanjiro_mini_model_gift_1794420808743.jpg'
    },
    tastingNotes: ['Tart Crimson Berry', 'Rich Bittersweet Cocoa', 'Subtle Roasted Nib Finish'],
    themeColor: {
      primary: '#059669',
      secondary: '#DC2626',
      accent: '#C084FC',
      glow: 'rgba(192, 132, 252, 0.25)',
      gradient: 'from-pink-50 via-white to-purple-50'
    },
    quote: 'Kindness never weakens a warrior. Taste the warmth in every strawberry burst.',
    collectibleRarity: 'Ultra Rare'
  },
  {
    id: 'nezuko',
    name: 'Nezuko Kamado',
    characterTitle: 'Blossom of Awakening & Gentle Grace',
    anime: 'Demon Slayer',
    fruit: 'Kiwi',
    fruitEmoji: '🥝',
    flavorProfile: 'Zesty emerald kiwi jelly balanced with silky sweet white & ruby chocolate',
    chocolateShell: 'Silky 36% White & Natural Ruby Cocoa Sculpted Chibi Form',
    fruitFilling: 'Emerald Kiwi purée with natural seeds, lime-mint whisper & refreshing acidity',
    mouldingMotif: 'Character-sculpted chocolate with flowing dark hair, vermilion tips, pink kimono & green bamboo muzzle',
    sculptedChocolateImage: '/src/assets/images/nezuko_sculpted_chocolate_1794419626676.jpg',
    miniModelGift: {
      title: 'Nezuko Kamado · Bamboo Blossom Chibi',
      series: 'FruFriends Series 1 Mini Companions',
      height: '6.2 cm with Wooden Base',
      rarity: 'Secret Rare (★ 1 of 350)',
      specialFeature: 'Pearlescent Kimono Detailing & Cherry Blossom Sparkles',
      description: 'Charming figurine with gentle wide eyes, gradient orange hair tips, and golden asanoha pattern.',
      modelImage: '/src/assets/images/nezuko_cute_action_blossom_1794420254064.jpg'
    },
    tastingNotes: ['Zesty Kiwi Tang', 'Creamy Vanilla Milk', 'Crisp Green Crunch'],
    themeColor: {
      primary: '#EC4899',
      secondary: '#10B981',
      accent: '#F472B6',
      glow: 'rgba(236, 72, 153, 0.25)',
      gradient: 'from-pink-50 via-white to-purple-50'
    },
    quote: 'Delicate on the outside, fierce on the inside — an unexpected emerald punch.',
    collectibleRarity: 'Super Rare'
  },
  {
    id: 'rengoku',
    name: 'Kyojuro Rengoku',
    characterTitle: 'Flame Hashira of Unbridled Spirit',
    anime: 'Demon Slayer',
    fruit: 'Mango',
    fruitEmoji: '🥭',
    flavorProfile: 'Molten sun-drenched Alphonso mango coulis within flame-marbled chocolate',
    chocolateShell: 'Flame-Marbled Dark & Golden White Chocolate Sculpted Bust',
    fruitFilling: 'Sun-drenched Ratnagiri Alphonso Mango coulis infused with warm vanilla bean',
    mouldingMotif: 'Character-sculpted chocolate bust with blazing yellow-and-scarlet hair & Hashira uniform buttons',
    sculptedChocolateImage: '/src/assets/images/rengoku_sculpted_chocolate_1794419653324.jpg',
    miniModelGift: {
      title: 'Kyojuro Rengoku · Flame Pillar Standing Mini',
      series: 'FruFriends Series 1 Mini Companions',
      height: '7.2 cm with Blazing Fire Plinth',
      rarity: 'Ultra Rare (★ 1 of 500)',
      specialFeature: 'Ornate Filigree Gold Plinth & Billowing Flame Cloak',
      description: 'Dynamic heroic sculpt featuring sweeping flame haori, confident smile, and radiant gradient hair.',
      modelImage: '/src/assets/images/rengoku_mini_model_gift_1794420808320.jpg'
    },
    tastingNotes: ['Sun-Ripened Tropical Mango', 'Warm Cinnamon Spice', 'Velvety Caramel Cocoa'],
    themeColor: {
      primary: '#D97706',
      secondary: '#EF4444',
      accent: '#C084FC',
      glow: 'rgba(245, 158, 11, 0.25)',
      gradient: 'from-amber-50 via-white to-purple-50'
    },
    quote: 'Set your tastebuds ablaze! Umai! A burst of tropical fire that never fades.',
    collectibleRarity: 'Ultra Rare'
  },
  {
    id: 'giyu',
    name: 'Giyu Tomioka',
    characterTitle: 'Silent Tides & Undying Loyalty',
    anime: 'Demon Slayer',
    fruit: 'Blueberry',
    fruitEmoji: '🫐',
    flavorProfile: 'Deep sapphire wild blueberry preserve nestled in dual-tone geometric dark chocolate',
    chocolateShell: 'Dual-Tone Asymmetric Sapphire Gloss & Burgundy Character Chocolate',
    fruitFilling: 'Wild Himalayan Blueberry slow-simmered reduction with lavender floral note',
    mouldingMotif: 'Character-sculpted chocolate with tied dark ponytail & split dual-pattern geometric water haori',
    sculptedChocolateImage: '/src/assets/images/giyu_sculpted_chocolate_1794420251891.jpg',
    miniModelGift: {
      title: 'Giyu Tomioka · Water Surface Slice Chibi',
      series: 'FruFriends Series 1 Mini Companions',
      height: '6.9 cm with Travertine Base',
      rarity: 'Super Rare (★ 1 of 400)',
      specialFeature: 'Dual-Fabric Geometric Haori Print & Blue Sword Gleam',
      description: 'Stoic pose with high-gloss hair, unsheathed blue-tint blade, and crystal-clear water ripple plinth.',
      modelImage: '/src/assets/images/giyu_sculpted_chocolate_1794420251891.jpg'
    },
    tastingNotes: ['Midnight Wild Berry', 'Deep Floral Lavender', 'Intense 70% Dark Cocoa'],
    themeColor: {
      primary: '#1E40AF',
      secondary: '#7C3AED',
      accent: '#A855F7',
      glow: 'rgba(124, 58, 237, 0.25)',
      gradient: 'from-blue-50 via-white to-purple-50'
    },
    quote: 'Still waters run deep. Beneath calm chocolate rests a storm of rich berry notes.',
    collectibleRarity: 'Super Rare'
  },
  {
    id: 'gojo',
    name: 'Satoru Gojo',
    characterTitle: 'The Limitless Sorcerer & Modern Icon',
    anime: 'Jujutsu Kaisen',
    fruit: 'Peach',
    fruitEmoji: '🍑',
    flavorProfile: 'Ethereal Japanese white peach nectar with silky cream ganache in sleek noir chocolate',
    chocolateShell: 'Sleek Mirror-Gloss Noir Chocolate Sculpted Bust with White Spiky Hair',
    fruitFilling: 'Yamanashi White Peach purée with sweet lychee syrup & white blossom essence',
    mouldingMotif: 'Character-sculpted chocolate bust with spiky white chocolate locks, dark blindfold & high collar jacket',
    sculptedChocolateImage: '/src/assets/images/gojo_sculpted_chocolate_1794419653681.jpg',
    miniModelGift: {
      title: 'Satoru Gojo · Limitless Void Chibi Mini',
      series: 'FruFriends Series 1 Mini Companions',
      height: '7.0 cm on Glowing Lavender Crystal',
      rarity: 'Ultra Rare (★ 1 of 500)',
      specialFeature: 'Illuminated Lavender Crystal Base & Domain Finger Sign',
      description: 'Iconic sorcerer sculpt with limitless domain pose, sculpted white hair, and luminous crystal plinth.',
      modelImage: '/src/assets/images/gojo_mini_model_gift_1794420808365.jpg'
    },
    tastingNotes: ['Silky White Peach Nectar', 'Luminescent Lychee', 'Pure Madagascar Cocoa'],
    themeColor: {
      primary: '#7C3AED',
      secondary: '#DB2777',
      accent: '#C084FC',
      glow: 'rgba(168, 85, 247, 0.3)',
      gradient: 'from-purple-50 via-white to-pink-50'
    },
    quote: 'Throughout heaven and earth, this flavor alone is the honored one.',
    collectibleRarity: 'Ultra Rare'
  },
  {
    id: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    characterTitle: 'Golden Flash & Sleep-Awakened Thunder',
    anime: 'Demon Slayer',
    fruit: 'Banana',
    fruitEmoji: '🍌',
    flavorProfile: 'Caramelized Cavendish banana cream with butterscotch crunch inside gold-dusted chocolate',
    chocolateShell: 'Artisanal Natural Milk Chocolate Sculpted Form with Layered Yellow Hair',
    fruitFilling: 'Slow-caramelized ripe Banana purée with golden honey butterscotch and popping crystal',
    mouldingMotif: 'Character-sculpted chocolate with blonde block-cut hair, orange tips & triangle yellow haori',
    sculptedChocolateImage: '/src/assets/images/zenitsu_sculpted_chocolate_1794420253280.jpg',
    miniModelGift: {
      title: 'Zenitsu Agatsuma · Thunderclap and Flash Chibi',
      series: 'FruFriends Series 1 Mini Companions',
      height: '6.6 cm with Lightning Stance Stand',
      rarity: 'Rare (★ 1 of 600)',
      specialFeature: 'Dual-Expression Asleep Lightning Strike & Gold Foil Plinth',
      description: 'Dual-expression asleep-awakened thunder god with electric gold finish and miniature sparrow companion.',
      modelImage: '/src/assets/images/zenitsu_sculpted_chocolate_1794420253280.jpg'
    },
    tastingNotes: ['Sweet Caramelized Banana', 'Golden Honey Toffee', 'Buttery Milk Chocolate'],
    themeColor: {
      primary: '#CA8A04',
      secondary: '#EA580C',
      accent: '#C084FC',
      glow: 'rgba(202, 138, 4, 0.25)',
      gradient: 'from-yellow-50 via-white to-purple-50'
    },
    quote: 'When fear peaks, instinct strikes like lightning — pure golden comfort in one bite.',
    collectibleRarity: 'Rare'
  }
];

export const IMAGES = {
  heroGiftbox: '/src/assets/images/frufriends_hero_giftbox_1794418955578.jpg',
  collectionLineup: '/src/assets/images/anime_character_chocolates_six_1794419628329.jpg',
  crossSection: '/src/assets/images/frufriends_chocolate_cross_section_1794418957185.jpg',
  mysteryUnboxing: '/src/assets/images/magical_enchanted_mystery_box_1794420806222.jpg',
  tanjiroSculpted: '/src/assets/images/tanjiro_sculpted_chocolate_1794419625887.jpg',
  nezukoSculpted: '/src/assets/images/nezuko_sculpted_chocolate_1794419626676.jpg',
  rengokuSculpted: '/src/assets/images/rengoku_sculpted_chocolate_1794419653324.jpg',
  giyuSculpted: '/src/assets/images/giyu_sculpted_chocolate_1794420251891.jpg',
  gojoSculpted: '/src/assets/images/gojo_sculpted_chocolate_1794419653681.jpg',
  zenitsuSculpted: '/src/assets/images/zenitsu_sculpted_chocolate_1794420253280.jpg',
  tanjiroWaterDragon: '/src/assets/images/tanjiro_water_dragon_slash_1794421346328.jpg',
  tanjiroSunBreathing: '/src/assets/images/tanjiro_sun_breathing_elegance_1794421346701.jpg',
  tanjiroSwordAction: '/src/assets/images/tanjiro_water_dragon_slash_1794421346328.jpg',
  nezukoCuteAction: '/src/assets/images/nezuko_cute_action_blossom_1794420254064.jpg',
  tanjiroMiniModel: '/src/assets/images/tanjiro_mini_model_gift_1794420808743.jpg',
  gojoMiniModel: '/src/assets/images/gojo_mini_model_gift_1794420808365.jpg',
  rengokuMiniModel: '/src/assets/images/rengoku_mini_model_gift_1794420808320.jpg',
};


export const MARKET_STATS = {
  currentSize: '₹25,245 crore',
  currentYear: '2024',
  projectedSize: '₹47,878 crore',
  projectedYear: '2033',
  cagr: '7.3%',
  cagrPeriod: '2025–2033',
  source: 'IBEF citing IMARC',
  disclaimer: 'Industry estimates for the overall Indian chocolate confectionery market, not FruFriends revenue or market share.',
  insight: 'FruFriends connects three massive consumer interests: chocolate indulgence, character fandom, and collectible gifting.'
};

export const AGE_SEGMENTS = [
  {
    group: 'CHILDREN',
    ageRange: '6–12',
    hook: 'Playful Wonder & Excitement',
    description: 'Cute character designs, colourful packaging and exciting surprises.',
    badge: 'Magic & Joy',
    iconName: 'Sparkles',
    drivers: ['Surprise unboxing thrill', 'Recognisable anime aesthetics', 'Sweet fruity flavors']
  },
  {
    group: 'TEENAGERS',
    ageRange: '13–19',
    hook: 'Fandom, Identity & Community',
    description: 'Anime fandom, collecting, unboxing and sharing with friends.',
    badge: 'Fandom Culture',
    iconName: 'Users',
    drivers: ['Fandom loyalty', 'Collectible card trades', 'Social media aesthetic unboxing']
  },
  {
    group: 'YOUNG ADULTS',
    ageRange: '20–35',
    hook: 'Curated Taste & Aesthetic Gifting',
    description: 'Premium chocolate, innovative fruit flavours, gifting and aesthetic presentation.',
    badge: 'Premium Lifestyle',
    iconName: 'Gift',
    drivers: ['Gourmet fruit-cocoa pairing', 'Designer gift boxes', 'Nostalgic anime appreciation']
  },
  {
    group: 'ADULTS',
    ageRange: '35+',
    hook: 'Artisanal Indulgence & Shared Moments',
    description: 'Chocolate indulgence, fruit combinations, gifting and sharing special moments.',
    badge: 'Artisanal Quality',
    iconName: 'HeartHandshake',
    drivers: ['Single-origin cocoa quality', 'Balanced fruit acidity', 'Luxury family & festival gifting']
  }
];

export const USP_PILLARS = [
  {
    id: 'edible_characters',
    number: '01',
    title: 'EDIBLE ANIME CHARACTERS',
    subtitle: 'Sculpted Artistry in Every Bonbon',
    description: 'Premium chocolate shaped into six character-inspired designs, capturing iconic haori patterns, flaming hair gradients, and signature emblems in edible tempered cocoa.',
    accent: '#E5C378',
    highlight: 'Not cheap toys or flat prints: true 3D gourmet chocolate architecture.'
  },
  {
    id: 'real_fruit',
    number: '02',
    title: 'REAL-FRUIT SURPRISE',
    subtitle: 'Vibrant, Oozing Natural Purées',
    description: 'Six different soft fruit fillings: strawberry, kiwi, mango, blueberry, peach and banana. Each bonbon bursts with slow-simmered real fruit coulis that balances the richness of the cocoa shell.',
    accent: '#FB7185',
    highlight: 'No artificial syrup pastes: real fruit reductions with natural zest and aroma.'
  },
  {
    id: 'collect_gift_discover',
    number: '03',
    title: 'COLLECT, GIFT AND DISCOVER',
    subtitle: 'The Complete Multi-Sensory Experience',
    description: 'Mystery boxes, character-specific wrappers, collectible metallic holographic cards, and miniature companions. Every box creates anticipation before the first bite.',
    accent: '#38BDF8',
    highlight: 'Turns confectionery into a high-retention collectible phenomenon.'
  }
];
