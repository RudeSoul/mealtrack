export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expirationDate: string;
  location: string;
  minimumStock: number;
  cost: number;
}
