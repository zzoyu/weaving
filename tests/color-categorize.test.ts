import { describe, expect, it } from 'vitest';
import {
  categorizeFromHexOrName,
  get12ColorCategory,
  hexToHsl
} from '../utils/color-categorize';

describe('color-categorize utilities', () => {
  it('hexToHsl converts white/black/basic colors correctly', () => {
    expect(hexToHsl('#ffffff')).toEqual({ h: 0, s: 0, l: 100 });
    expect(hexToHsl('#000000')).toEqual({ h: 0, s: 0, l: 0 });
    expect(hexToHsl('#ff0000')).toEqual({ h: 0, s: 100, l: 50 });
    expect(hexToHsl('#00ff00')).toEqual({ h: 120, s: 100, l: 50 });
    expect(hexToHsl('#0000ff')).toEqual({ h: 240, s: 100, l: 50 });
    // short hex
    expect(hexToHsl('#f00')).toEqual({ h: 0, s: 100, l: 50 });
  });

  it('categorizeFromHexOrName handles named keys and hex strings', () => {
    const red = categorizeFromHexOrName('red');
    expect(typeof red).toBe('string');
    expect((['Red','Pink','Orange','Brown','Silver','Yellow','Blue','Green','SkyBlue','Purple','White','Black'] as string[])).toContain(red as string);

    const hexYellow = categorizeFromHexOrName('#fde047');
    expect(hexYellow).toBe('Yellow');

    const hexRed = categorizeFromHexOrName('#ef4444');
    expect(hexRed).toBe('Red');
  });

  it('get12ColorCategory respects black/white/silver thresholds', () => {
    expect(get12ColorCategory(0, 50, 12)).toBe('Black');
    expect(get12ColorCategory(0, 5, 95)).toBe('White');
    expect(get12ColorCategory(200, 5, 50)).toBe('Silver');
  });

  it('hue boundaries produce expected categories', () => {
    expect(get12ColorCategory(14, 50, 50)).toBe('Red');
    expect(get12ColorCategory(15, 50, 50)).toBe('Orange');
    // Hue 41 falls into brown hue range (20-60) and meets brown saturation/lightness rules
    expect(get12ColorCategory(41, 50, 50)).toBe('Brown');
    // H=42 with medium lightness falls into brown-special-case
    expect(get12ColorCategory(42, 50, 50)).toBe('Brown');
    // But a very bright (L>80) hue at 42 should be classified as Yellow (bright blonde case)
    expect(get12ColorCategory(42, 50, 85)).toBe('Yellow');
    expect(get12ColorCategory(74, 50, 50)).toBe('Yellow');
    expect(get12ColorCategory(75, 50, 50)).toBe('Green');
  });
});
