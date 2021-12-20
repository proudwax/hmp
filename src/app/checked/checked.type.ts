export type CheckedLikePlugin = {
  support(d: string): boolean;
  getChecked(): { value: string; text: string };
};

export type CheckedItem =  { value: string; text: string };
