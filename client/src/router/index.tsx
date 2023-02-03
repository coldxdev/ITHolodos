import { createBrowserRouter } from 'react-router-dom';
import Home from '../views/Home';
import Kitchen from '../views/Kitchen';
import Recipe from '../views/Recipe';
import Recipes from '../views/Recipes';


export enum AppRoutes {
    HOME = '/',
	RECIPES = "/recipes",
	RECIPE = "/recipes/:name",
	KITCHEN = "/kitchen",
}

const router = createBrowserRouter([
	{
		path: AppRoutes.HOME,
		element: <Home />,
	},
	{
		path: AppRoutes.KITCHEN,
		element: <Kitchen />,
	},
	{
		path: AppRoutes.RECIPES,
		element: <Recipes />,
	},
	{
		path: AppRoutes.RECIPE,
		element: <Recipe />,
	},
]);


export default router;
