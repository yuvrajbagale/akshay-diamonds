export interface OrderAddress {
  readonly fullName: string;
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state: string;
  readonly pincode: string;
  readonly phone: string;
}

export interface OrderContact {
  readonly email: string;
  readonly phone: string;
}

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'emi';

export interface Order {
  readonly id: string;
  readonly items: readonly {
    readonly diamondId: string;
    readonly name: string;
    readonly carat: number;
    readonly price: number;
    readonly quantity: number;
  }[];
  readonly contact: OrderContact;
  readonly shipping: OrderAddress;
  readonly payment: PaymentMethod;
  readonly subtotal: number;
  readonly shippingCost: number;
  readonly total: number;
  readonly status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  readonly createdAt: string;
  readonly estimatedDelivery: string;
}
