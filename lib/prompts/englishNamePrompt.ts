import { EnglishNameParams } from '../types/nameGeneration';

export function generateEnglishNamePrompt({
  gender,
  style,
  meaning,
  firstLetter,
  chineseName
}: EnglishNameParams) {
  const basePrompt = `As a professional name consultant, please generate given names (not surnames) strictly in the following JSON format:

{
  "names": [
    {
      "name": "Given name only",
      "meaning": "Brief etymology and meaning, using commas between parts",
      "cultural_notes": "Brief cultural significance and context, using commas between parts",
      "score": 95
    }
  ]
}

Requirements:
- Gender: ${gender}
- Style: ${style}
- Desired Meaning: ${meaning}
${firstLetter ? `- First Letter: ${firstLetter}` : ''}
${chineseName ? `- Chinese Name Reference: ${chineseName}` : ''}

Please follow these rules:
1. Generate exactly 3 given names (no surnames)
2. Each name should be a single word
3. Use only standard English letters
4. Keep descriptions concise and clear
5. Use only English punctuation
6. Score must be between 1-100
7. Consider name popularity and modern usage
8. Ensure easy pronunciation
9. Focus on meaningful and elegant names`;

  return basePrompt;
}