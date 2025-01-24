import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import {
  AboutPage,
  CellPhonesPage,
  HomePage,
  LoginPage,
  OrdersUserPage,
  RegisterPage,
  CheckoutPage,
  CellPhonePage,
  Gracias,
  OrderUserPage,
  DashboardProductPage,
  DashboardNewProductPage,
  DashboardProductSlugPage,
  DashboardOrdersPage,
  DashboardOrderPage,
} from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "celulares",
        element: <CellPhonesPage />,
      },
      {
        path: "celulares/:slug",
        element: <CellPhonePage />,
      },
      {
        path: "nosotros",
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "registro",
        element: <RegisterPage />,
      },
      {
        path: "account",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <Navigate to="/account/pedidos" />,
          },
          {
            path: "pedidos",
            element: <OrdersUserPage />,
          },

          {
            path: "pedidos/:id",
            element: <OrderUserPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/checkout/:id/gracias",
    element: <Gracias />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard/productos" /> },
      {
        path: "productos",
        element: <DashboardProductPage />,
      },
      {
        path: "productos/nuevo",
        element: <DashboardNewProductPage />,
      },
      {
        path: "productos/editar/:slug",
        element: <DashboardProductSlugPage />,
      },
      {
        path: "ordenes",
        element: <DashboardOrdersPage />,
      },
      {
        path: "ordenes/:id",
        element: <DashboardOrderPage />,
      },
    ],
  },
]);
