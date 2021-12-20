export type CalculateLikePlugin = {
  support(configName: string): boolean;
  getCalculate(): {
    unit: string[];
    handler: (a: number, b: number) => number;
  }
}

export type CalculateItem = {
  unit: string[];
  handler: (...args: number[]) => number;
}

export type CalculateSaved = number[];
