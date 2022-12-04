export const trimString = (string: string, maxLength: number) => {
  return string.length > length
    ? string.substring(0, maxLength - 3) + "..."
    : string;
};
