export type PriceOverview = {
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
};
export type Platforms = {
  windows: boolean;
  mac: boolean;
  linux: boolean;
};

export type Category = {
  id: number;
  description: string;
};

export type Screenshot = {
  id: number;
  path_thumbnail: string;
  path_full: string;
};

export type Movie = {
  id: number;
  name: string;
  thumbnail: string;
  webm: {
    480: string;
    max: string;
  };
  mp4: {
    480: string;
    max: string;
  };
};

export type Game = {
  _id: string;
  name: string;
  about_the_game: string;
  short_description: string;
  header_image: string;
  developers: string[];
  publishers: string[];
  price_overview: PriceOverview;
  platforms: Platforms;
  categories: Category[];
  screenshots: Screenshot[];
  movies: Movie[];
  background: string;
};
