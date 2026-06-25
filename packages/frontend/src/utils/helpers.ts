export const toTitleCase = (str: string): string =>
  str
    .split(' ')
    .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
    .join(' ');
