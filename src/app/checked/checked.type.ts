export type CheckedLikePlugin = {
  support(d: string): boolean;
  getData(): { value: string; text: string };
};

export type CheckedItem =  { value: string; text: string };
