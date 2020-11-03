class Mark {
  private startMarks: {
    [key: string] : number
  } = {};

  private endMarks: {
    [key: string] : number
  } = {};

  public clear() {
    this.startMarks = {};
    this.endMarks = {};
  }

  public start(mark: string): void {
    this.startMarks[mark] = Number(new Date());
  }

  public end(mark: string): void {
    this.startMarks[mark] = Number(new Date());
  }

  public get(mark: string): number|null {
    if (this.endMarks[mark] && this.startMarks[mark]) {
      return this.endMarks[mark] - this.startMarks[mark];
    }

    if (!this.endMarks[mark] && this.startMarks[mark]) {
      return Number(new Date()) - this.startMarks[mark];
    }

    return null;
  }
}

export const mark = new Mark();



export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve)=>setTimeout(resolve, ms));
};