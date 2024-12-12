export const darkenColor = (hexColor: string, amount: number): string => {
  const color = hexColor.replace("#", "");
  const num = parseInt(color, 16);

  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  return `rgb(${r}, ${g}, ${b})`;
};

export const hexToLightenRgbaGradient = (
  hex: string,
  lightenPercent: number,
  alpha: number = 1
): string => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Increase each value by the percentage to lighten the color
  r = Math.min(255, Math.floor(r + ((255 - r) * lightenPercent) / 100));
  g = Math.min(255, Math.floor(g + ((255 - g) * lightenPercent) / 100));
  b = Math.min(255, Math.floor(b + ((255 - b) * lightenPercent) / 100));

  // Convert to RGBA
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;

  // Return the linear gradient string
  return `linear-gradient(90deg, ${rgba} 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)`;
};
