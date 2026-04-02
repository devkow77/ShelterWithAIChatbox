import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Navbar, Footer } from "@/components/layout/shared";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  AnimalsPage,
  FoundAnimalsPage,
} from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/register",
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/login",
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/zwierzeta",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AnimalsPage />,
      },
    ],
  },
  {
    path: "/znalezione-zwierzeta",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <FoundAnimalsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
