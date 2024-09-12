import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import { ProtectedRoute } from "@/pages/ProtectedRoutes";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Productos from "@/pages/Productos";
import { Home, LineChart, Package, ShoppingCart } from "lucide-react";
import path from "path";
import Producto from "@/pages/Producto";
import Repuestos from "@/pages/Repuestos";
import Repuesto from "@/pages/Repuesto";



const adminList = [
  { name: "Dashboard", href: "#", icono: <Home className="h-5 w-5" /> },
  { name: "Lista Productos", href: "productos", icono: <Package className="h-5 w-5" /> },
  { name: "Repuestos", href: "repuestos", icono: <ShoppingCart className="h-5 w-5" /> },
  { name: "Reportes", href: "reportes", icono: <LineChart className="h-5 w-5" /> },
];


const vistaList = ['Vista Item 1', 'Vista Item 2', 'Vista Item 3'];
const pruebaList = ['Prueba Item 1', 'Prueba Item 2', 'Prueba Item 3'];



function Routes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/admin",
      element: <ProtectedRoute element={<Dashboard links={adminList} />} />,
      children: [
        {
          path: "productos",
          element: <Productos />,
        },
        {
          path: "productos/:idproducto",
          element: <Producto />,
        },
        {
          path: "repuestos",
          element: <Repuestos />,
        },
        {
          path: "repuestos/:idrepuesto",
          element: <Repuesto />,
        },

      ],
    },
    {
      path: "/vista",
      element: <ProtectedRoute element={<Dashboard links={adminList} />} />,
      children: [
        {
          path: "productos",
          element: <Productos />,
        },
        {
          path: "productos/:idproducto",
          element: <Producto />,
        },

      ],
    },
  ]);
  //], { basename: "/react-smc"} );


  return (
    <RouterProvider router={router} />
  )
}

export default Routes