export interface CartItem {
  readonly diamondId: string;
  readonly quantity: number;
  readonly addedAt: string;
  readonly type?: 'diamond' | 'ring';
  readonly ringConfig?: {
    readonly settingName: string;
    readonly settingMetal: string;
    readonly settingPrice: number;
    readonly diamondName: string;
    readonly diamondCarat: number;
    readonly diamondShape: string;
    readonly diamondColor: string;
    readonly diamondClarity: string;
    readonly ringSize: number;
    readonly total: number;
  };
}