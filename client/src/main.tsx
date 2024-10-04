import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import MainPage from "./pages/main-page.tsx";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import SignIn from "./pages/login.tsx";
import SignUp from "./pages/sign-up.tsx";
import ClientRoutes from "./enums/client-routes.ts";
import { Provider } from "react-redux";
import store from "./store.ts";

const router = createBrowserRouter([
	{
		path: ClientRoutes.MAIN_PAGE,
		element: <MainPage />,
	},
	{
		path: ClientRoutes.SIGN_IN,
		element: <SignIn />,
	},
	{
		path: ClientRoutes.SIGN_UP,
		element: <SignUp />,
	},
	{
		path: ClientRoutes.UNSPECIFIED_PAGE,
		element: <Navigate to="/" />,
	},
]);

console.log('asdfasdf')

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
