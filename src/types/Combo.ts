export interface ComboService {
  name: string;
  price: number;
}

export interface Combo {
  id: string;
  title: string;
  campaign: string;
  campaignColor: string;
  description: string;
  services: ComboService[];
  originalPrice: number;
  comboPrice: number;
  discount: string;
  ideal: string;
}
