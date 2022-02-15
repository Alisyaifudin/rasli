export type themeTypes = 'light' | 'dark';

export interface MetaState {
  theme: themeTypes;
  languages: string[]; 
  language: string;
  openSetting: boolean;
}