export interface JewelleryProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  metal: string;
  diamondCarat?: number;
  diamondShape?: string;
  diamondColor?: string;
  diamondClarity?: string;
  description: string;
  certification: string;
  available: boolean;
}

export interface JewelleryCategory {
  slug: string;
  name: string;
  description: string;
}
