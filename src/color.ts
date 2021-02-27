import { Color } from './types';

export const white: Color = '#ffffff';
export const black: Color = '#000000';

// Does not include a '#' since it has a special meaning in URLs.
export const colorQueryParamRegex = /^[0-9a-f]{6}$/;
