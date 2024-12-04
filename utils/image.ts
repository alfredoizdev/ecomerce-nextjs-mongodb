export const extractIdFromUrl = (url: string): string | null => {
  const regex = /\/([^\/]+)\.webp$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
