import { Theme } from './definitions';
import { categories, themes } from './template_data';

export function getTheme(identifier: string): Theme {
  return themes[identifier];
}

export function getPreviewNames(identifier: string): string[] {
  const names = themes[identifier].names;

  // Filter names that are too long
  const filtered = names.filter((name) => (name as string).length <= 10);

  // Shuffle Names
  const shuffledArray = [...filtered];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return first 6
  return shuffledArray.slice(0, 4);
}
