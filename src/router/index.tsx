import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { AboutPage, CellPhonesPage, HomePage } from "../pages";
import { CellPhonePage } from "../pages/CellPhonePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'celulares',
                element: <CellPhonesPage />
            },
            {
                path: 'celulares/:slug',
                element: <CellPhonePage />
            },
            {
                path: 'nosotros',
                element: <AboutPage />
            },
        ]
    }
])