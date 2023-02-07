export interface IngredientI {
    id: number;
    name: string;
    image: string;
    amount?: number;
    unit?: string;
    stored?: boolean | null;
}

export interface IngredientDetailI extends IngredientI {
    categoryPath?: string[];
    possibleUnits?: string[];
}
