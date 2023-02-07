import { IngredientDetailI } from './../types/Ingredient';
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
    } catch (error: ReturnType<Error>) {
        throw new Error(error);
    }
};

export const fetchDetailIngredientById = async (
    id: number
): Promise<IngredientDetailI> => {
    try {
        const result = await axios
            .get(`/ingredients/${id}`)
            .then(res => res.data);

        return result;
    } catch (error: ReturnType<Error>) {
        throw new Error(error);
    }
};
