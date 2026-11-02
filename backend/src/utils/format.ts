export default function titleCase(str: string): string {
  const lowercaseWords = new Set([
    'and',
    'or',
    'of',
    'the',
    'a',
    'an',
    'in',
    'on',
    'at',
    'to',
    'for',
    'by'
  ]);

  return str
    .toLowerCase()
    .split('-')
    .map((word, index) => {
      if (index > 0 && lowercaseWords.has(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}