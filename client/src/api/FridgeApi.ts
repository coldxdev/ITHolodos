import { IngredientI } from '../types/Ingredient';
import axios from './index';

export const fetchIngredientByKeyword = async (
    keyword: string
): Promise<IngredientI[]> => {
    try {
        const result = await axios
            .get(`/ingredients?key_word=${keyword}`)
            .then(res => res.data);

        return result;
    } catch (error: any) {
        throw new Error(error);
    }
};
