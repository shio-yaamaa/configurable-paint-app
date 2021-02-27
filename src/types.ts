export interface Config {
  width: number;
  height: number;

  initialPenColor: Color;
  initialPenSize: number;

  backgroundColor: Color;

  paletteColors: Color[];
}

export type Color = string; // e.g. '#ff0000', '#f00'
