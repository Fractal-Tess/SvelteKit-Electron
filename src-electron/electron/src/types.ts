export type Store = Partial<{
  'win-size': Size;
  'win-pos': Position;
  theme: Theme;
}>;

export type Size = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Theme = 'light' | 'dark';
