export type Category = {
  name: string;
  language: string;
  bgColor: string;
  themes: Theme[];
};

export type Theme = {
  identifier: string;
  name: string;
  names: Name[];
};

export type ThemesObject = {
  [identifier: string]: Theme;
};

export type Name = string;
