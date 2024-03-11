

export type AnalyticsResponse<T> = {
  from: string;
  to: string;
  generationmix: T[];
};