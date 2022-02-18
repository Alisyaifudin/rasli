export type themeTypes = 'light' | 'dark';
export interface MetaState {
  theme: themeTypes;
  languages: string[]; 
  language: string;
  openSetting: boolean;
  openHelp: boolean;
  openStatistics: boolean;
  number: number;
}