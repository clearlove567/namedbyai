export interface NameGenerationParams {
  lastName: string;
  gender: 'male' | 'female';
  style: string;
  meaning: string;
  nameLength: string;
  birthDate?: string;
}

export interface EnglishNameParams {
  gender: 'male' | 'female';
  style: string;
  meaning: string;
  firstLetter?: string;
  chineseName?: string;
}

export interface NameResult {
  name: string;
  meaning: string;
  cultural_notes: string;
  score: number;
}