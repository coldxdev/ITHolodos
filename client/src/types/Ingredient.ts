export interface IngredientI {
    id: number;
    name: string;
    image: string;
    amount?: number;
    unit?: string;
    stored?: boolean;
}
