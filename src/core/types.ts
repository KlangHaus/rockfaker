/** Entry with optional weight – higher weight = more likely to be picked */
export type Weighted<T> = { value: T; weight: number };

/** A data source can be plain items or weighted items */
export type DataSource<T> = T[] | Weighted<T>[];

/** Locale data shape */
export interface RockstarLocale {
  code: string;
  person: {
    firstName: DataSource<string>;
    lastName: DataSource<string>;
    prefix?: DataSource<string>;
    suffix?: DataSource<string>;
  };
  band: {
    name: DataSource<string>;
    genre: DataSource<string>;
    album: DataSource<string>;
  };
  education: {
    courseTitle: DataSource<string>;
    moduleTitle: DataSource<string>;
    subject: DataSource<string>;
  };
}
