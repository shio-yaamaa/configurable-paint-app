import { Config, Color } from './types';
import { black, colorQueryParamRegex, white } from './color';

const defaultConfig: Config = {
  width: 800,
  height: 600,

  initialPenColor: black,
  initialPenSize: 10,

  backgroundColor: white,

  paletteColors: [],
};

export const getConfigFromQueryParams = (queryParams: URLSearchParams): Config => {
  return {
    width: getQueryParamAsPositiveInt(queryParams, 'width') ?? defaultConfig.width,
    height: getQueryParamAsPositiveInt(queryParams, 'height') ?? defaultConfig.height,

    initialPenColor: getQueryParamAsColor(queryParams, 'initial_pen_color') ?? defaultConfig.initialPenColor,
    initialPenSize: getQueryParamAsPositiveInt(queryParams, 'initial_pen_size') ?? defaultConfig.initialPenSize,

    backgroundColor: getQueryParamAsColor(queryParams, 'background_color') ?? defaultConfig.backgroundColor,

    paletteColors: getQueryParamAsColorList(queryParams, 'palette_color') ?? defaultConfig.paletteColors,
  };
};

const getQueryParamAsPositiveInt = (queryParams: URLSearchParams, paramName: string): number | null => {
  const value = queryParams.get(paramName);
  if (value === null) return null;
  const int = parseInt(value);
  return int > 0 ? int : null;
};

const getQueryParamAsColor = (queryParams: URLSearchParams, paramName: string): Color | null => {
  const value = queryParams.get(paramName);
  if (value === null) return null;
  return value.match(colorQueryParamRegex) ? `#${value}` : null;
};

const getQueryParamAsColorList = (queryParams: URLSearchParams, paramName: string): Color[] | null => {
  const values = queryParams.getAll(paramName);
  if (values.length === 0) return null;
  return values.filter(value => value.match(colorQueryParamRegex)).map(value => `#${value}`);
};
