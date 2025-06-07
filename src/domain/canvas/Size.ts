export class Size {
  constructor(
    public readonly width: number,
    public readonly height: number
  ) {}

  scale(factor: number): Size {
    return new Size(this.width * factor, this.height * factor)
  }

  area(): number {
    return this.width * this.height
  }

  isEmpty(): boolean {
    return this.width === 0 || this.height === 0
  }
}
