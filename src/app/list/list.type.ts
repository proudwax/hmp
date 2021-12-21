export type ListLikePlugin = {
  support(configName: string): boolean;
  getList(): {
    unit: string[];
    title: string[];
  }
}
