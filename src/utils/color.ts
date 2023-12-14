function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHsl(
  red: number,
  green: number,
  blue: number
): [number, number, number] {
  let r = red;
  let g = green;
  let b = blue;

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        throw new Error('Invalid color');
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = (p: number, q: number, k: number) => {
      let t = k;

      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const rgbToHex = (r: number, g: number, b: number): string =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;

export function generateColorVariations(
  baseColor: string
): Record<string, string> {
  const [r, g, b] = hexToRgb(baseColor);
  const [h, s, baseL] = rgbToHsl(r, g, b);

  const variations: Record<string, string> = {};
  const factorDarker = 0.065;
  const factorLighter = 0.1;
  const midPoint = 5;

  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  for (let i = 0; i < keys.length; i++) {
    let l;
    if (i < midPoint) {
      l = baseL + (midPoint - i) * factorLighter;
      l = l > 1 ? 1 : l;
    } else if (i > midPoint) {
      l = baseL - (i - midPoint) * factorDarker;
      l = l < 0 ? 0 : l;
    } else {
      l = baseL;
    }

    const [newR, newG, newB] = hslToRgb(h, s, l);
    variations[`--color-custom-${keys[i]}`] = rgbToHex(newR, newG, newB);
  }

  return variations;
}
