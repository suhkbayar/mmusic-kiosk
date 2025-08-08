export interface IBannerAction {
  id: string;
  text: string;
  url: string;
  icon: string;
  type: BannerActionType;
}

export interface IBanner {
  id: string;
  name: string;
  description: string;
  startAt: string;
  endAt: string;
  system: BannerSystem;
  type: BannerType;
  image: string;
  actions: IBannerAction[];
}

export enum BannerActionType {
  L = 'L', //Link
}

export enum BannerSystem {
  Q = 'Q', //QR Menu
  K = 'K', //Kiosk
  M = 'M', //Merchant
  B = 'B', //Buyer
}

export enum BannerType {
  M = 'M', //Mid
  F = 'F', //Footer
  E = 'E', //End
  P = 'P', //Popup
  A = 'A', //After
}
