/**
 * 캐릭터 테마 색상 자동 분류 함수
 * @param H (Hue): 0 ~ 360
 * @param S (Saturation): 0 ~ 100
 * @param L (Lightness): 0 ~ 100
 * @returns 'Black' | 'White' | 'Yellow' | 'Silver' | 'Brown' | 'Red' | 'Pink' | 'Orange' | 'Purple' | 'Blue' | 'SkyBlue' | 'Green'
 */
export type ColorCategory =
  | 'Black'
  | 'White'
  | 'Yellow'
  | 'Silver'
  | 'Brown'
  | 'Red'
  | 'Pink'
  | 'Orange'
  | 'Purple'
  | 'Blue'
  | 'SkyBlue'
  | 'Green';

import { colorHexMap } from '../types/color';
import { COLOR_THRESHOLDS, HUE_THRESHOLDS } from './color-thresholds';

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

// thresholds are imported from `utils/color-thresholds.ts`

/**
 * Convert hex color string (#RRGGBB, #RGB, RRGGBB, RGB) to HSL
 * Returns { h: 0-360, s: 0-100, l: 0-100 }
 */
export function hexToHsl(hex: string) {
  if (!hex) return { h: 0, s: 0, l: 0 };
  let cleaned = String(hex).trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return { h: 0, s: 0, l: 0 };
  }
  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
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
    }
    h = h * 60;
  }

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Convenience: categorize from a hex string or named color key present in `colorHexMap`.
 */
export function categorizeFromHexOrName(input: string): ColorCategory {
  if (!input) return 'Silver';
  const key = input.trim().toLowerCase();
  const hex = colorHexMap[key] ?? input;
  const { h, s, l } = hexToHsl(hex);
  return get12ColorCategory(h, s, l);
}

/**
 * 캐릭터 테마 색상 자동 분류 함수
 * @param H (Hue): 0 ~ 360 (any number will be normalized into this range)
 * @param S (Saturation): 0 ~ 100
 * @param L (Lightness): 0 ~ 100
 * @returns ColorCategory
 */
export function get12ColorCategory(H: number, S: number, L: number): ColorCategory {
  // 입력 정규화: 숫자가 아니면 0으로 처리, 값 범위 보정
  let hue = Number(H ?? 0);
  if (!Number.isFinite(hue) || Number.isNaN(hue)) hue = 0;
  // 모듈러로 0~360 범위로 정규화
  hue = ((hue % 360) + 360) % 360;

  const sat = clamp(Number(S ?? 0) || 0, 0, 100);
  const lit = clamp(Number(L ?? 0) || 0, 0, 100);

  // ----------------------------------------------------
  // 1. 무채색 판별 (Black / White / Silver)
  // ----------------------------------------------------

  // [Black] 암흑 (화면상 거의 검정)
  if (lit <= COLOR_THRESHOLDS.BLACK_LIGHTNESS) return 'Black';

  // [White] 아주 밝고 색기운이 거의 없음
  if (lit >= COLOR_THRESHOLDS.WHITE_LIGHTNESS && sat <= COLOR_THRESHOLDS.WHITE_SATURATION) return 'White';

  // [Silver] 정통 회색만 인정 (파스텔톤 오분류 방지)
  // S <= SILVER_SATURATION : 아주 엄격한 기준. (이후 필요 시 8~10으로 완화 가능)
  if (sat <= COLOR_THRESHOLDS.SILVER_SATURATION) return 'Silver';


  // ----------------------------------------------------
  // 2. 특수 색상 (Brown: 갈색 & 베이지)
  // ----------------------------------------------------

  // 갈색/베이지 구간 (주황 ~ 노랑 ~ 올리브 초입)
  if (hue >= COLOR_THRESHOLDS.BROWN_HUE_MIN && hue < COLOR_THRESHOLDS.BROWN_HUE_MAX) {
    // 2-1. [Dark Brown] 명도가 낮으면 채도가 높아도 갈색 (밤색)
    if (lit < COLOR_THRESHOLDS.BROWN_DARK_LIGHTNESS) return 'Brown';

    // 2-2. [Beige / Light Brown] 금발 보호 로직 포함
    // 조건: 명도가 중간~약간 높음 AND 채도가 낮음
    if (
      lit >= COLOR_THRESHOLDS.BROWN_LIGHT_MIN &&
      lit <= COLOR_THRESHOLDS.BROWN_LIGHT_MAX &&
      sat < COLOR_THRESHOLDS.BROWN_SATURATION_MAX
    )
      return 'Brown';
  }


  // ----------------------------------------------------
  // 3. 유채색 (Hue 기반 분류)
  // ----------------------------------------------------
  // 위 조건(Silver, Brown)을 통과한 모든 색은 여기서 고유 색상으로 분류
  // (S가 6~20 사이인 파스텔톤 색상들도 여기서 처리됨)

  if (hue >= HUE_THRESHOLDS.RED_WRAP_MIN || hue < HUE_THRESHOLDS.RED_WRAP_MAX) return 'Red';
  if (hue >= HUE_THRESHOLDS.ORANGE_MIN && hue < HUE_THRESHOLDS.ORANGE_MAX) return 'Orange'; // Brown이 아닌 쨍한 주황 + 살구색
  if (hue >= HUE_THRESHOLDS.YELLOW_MIN && hue < HUE_THRESHOLDS.YELLOW_MAX) return 'Yellow'; // 금발(L>80) + 쨍한 노랑
  if (hue >= HUE_THRESHOLDS.GREEN_MIN && hue < HUE_THRESHOLDS.GREEN_MAX) return 'Green';
  if (hue >= HUE_THRESHOLDS.SKYBLUE_MIN && hue < HUE_THRESHOLDS.SKYBLUE_MAX) return 'SkyBlue';
  if (hue >= HUE_THRESHOLDS.BLUE_MIN && hue < HUE_THRESHOLDS.BLUE_MAX) return 'Blue';
  if (hue >= HUE_THRESHOLDS.PURPLE_MIN && hue < HUE_THRESHOLDS.PURPLE_MAX) return 'Purple';
  if (hue >= HUE_THRESHOLDS.PINK_MIN && hue < HUE_THRESHOLDS.PINK_MAX) return 'Pink'; // 연분홍(Pastel Pink) 포함

  // Fallback (안전장치)
  return 'Silver';
}