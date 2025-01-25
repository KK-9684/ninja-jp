export const toArrayOfStrings = (value: string | string[]): string[] => {
  return Array.isArray(value) ? [...value] : [value];
};
