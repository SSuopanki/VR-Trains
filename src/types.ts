export type TTrains = {
  trainNumber: number;
  speed: number;
  location: { coordinates: Array<number>; type: string };
};

export type TLocationData = {
  county: string;
  name: string;
  region: string;
};

export type TData = {
  data: Array<TLocationData>;
};
