export const toNumber = (input: string | string[] | undefined, defaultValue?: number): number => {
    if (input === undefined || input === null || input === '') {
      return defaultValue ?? 0;
    } else if (Array.isArray(input)) {
      input = input[0]
    }
    return Number(input?.toLowerCase());
  }