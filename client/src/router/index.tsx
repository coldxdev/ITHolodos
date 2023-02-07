import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Recipe from '../views/Recipe';

export enum AppRoutes {
    HOME = '/',
    RECIPES = '/recipes',
    RECIPE = '/recipes/:id',
}

const router = createBrowserRouter([
    {
        path: AppRoutes.HOME,
        element: <Home />,
    },
    {
        path: AppRoutes.RECIPE,
        element: <Recipe />,
    },
]);

export default router;
