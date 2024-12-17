import { EnglishNameParams } from '../types/nameGeneration';

export function generateEnglishNamePrompt({
  gender,
  style,
  meaning,
  firstLetter,
  chineseName
}: EnglishNameParams) {
  const basePrompt = `As a professional name consultant, please generate English names with the following criteria:

Background:
- Gender: ${gender}
- Style Preference: ${style}
- Desired Meaning: ${meaning}
${firstLetter ? `- Preferred First Letter: ${firstLetter}` : ''}
${chineseName ? `- Chinese Name Reference: ${chineseName}` : ''}

Requirements:
1. Generate 3 unique name suggestions
2. Each name should consider:
   - Pronunciation harmony
   - Cultural appropriateness
   - Modern relevance
   - International adaptability
   
3. For each name provide:
   - Complete etymology
   - Cultural significance
   - Historical context (if any)
   - Popularity analysis
   - Overall score (1-100)

Please return in JSON format as follows:
{
  "names": [
    {
      "name": "Full Name",
      "meaning": "Detailed etymology and meaning",
      "cultural_notes": "Cultural significance and context",
      "score": score (1-100)
    }
  ]
}

Additional considerations:
- Ensure names are easy to pronounce
- Consider international usage
- Balance uniqueness with practicality
- Avoid overly complicated spellings`;

  return basePrompt;
}