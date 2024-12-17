// 中文名字风格选项
export const chineseNameStyles = [
  {
    value: "traditional",
    label: "传统典雅",
  },
  {
    value: "modern",
    label: "现代时尚",
  },
  {
    value: "artistic",
    label: "文艺清新",
  },
  {
    value: "powerful",
    label: "气势磅礴",
  }
];

// 英文名字风格选项
export const englishNameStyles = [
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "modern",
    label: "Modern",
  },
  {
    value: "unique",
    label: "Unique",
  },
  {
    value: "biblical",
    label: "Biblical",
  },
  {
    value: "literary",
    label: "Literary",
  }
];

export const englishMeanings = [
  {
    value: "strength",
    label: "Strength & Power",
    description: "Representing inner strength and power"
  },
  {
    value: "wisdom",
    label: "Wisdom & Intelligence",
    description: "Signifying wisdom and intellectual capacity"
  },
  {
    value: "love",
    label: "Love & Kindness",
    description: "Symbolizing love, compassion and kindness"
  },
  {
    value: "hope",
    label: "Hope & Faith",
    description: "Representing optimism and spiritual faith"
  },
  {
    value: "beauty",
    label: "Beauty & Grace",
    description: "Embodying beauty, elegance and grace"
  },
  {
    value: "victory",
    label: "Victory & Success",
    description: "Symbolizing achievement and triumph"
  },
  {
    value: "peace",
    label: "Peace & Harmony",
    description: "Representing tranquility and inner peace"
  },
  {
    value: "joy",
    label: "Joy & Happiness",
    description: "Signifying happiness and cheerfulness"
  },
  {
    value: "honor",
    label: "Honor & Nobility",
    description: "Embodying dignity and noble character"
  },
  {
    value: "nature",
    label: "Nature & Life",
    description: "Connected to natural beauty and vitality"
  },
  {
    value: "courage",
    label: "Courage & Bravery",
    description: "Representing bravery and determination"
  },
  {
    value: "freedom",
    label: "Freedom & Independence",
    description: "Symbolizing liberty and free spirit"
  }
];

// 生成A-Z的首字母选项
export const initialLetters = Array.from({ length: 26 }, (_, i) => ({
  value: String.fromCharCode(65 + i),
  label: String.fromCharCode(65 + i)
}));