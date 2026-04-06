import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Navbar, Footer, NavbarOnlyLayout } from "@/components/layout/shared";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  AnimalsPage,
  FoundAnimalsPage,
  HowToHelp,
  FaqPage,
  ContactPage,
  TermsPage,
  PrivacyPage,
} from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { AccountPage } from "./pages/client";

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
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/zwierzeta",
        element: <AnimalsPage />,
      },
      {
        path: "/znalezione-zwierzeta",
        element: <FoundAnimalsPage />,
      },
      {
        path: "/jak-pomoc",
        element: <HowToHelp />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/kontakt",
        element: <ContactPage />,
      },
      {
        path: "/regulamin",
        element: <TermsPage />,
      },
      {
        path: "/polityka-prywatnosci",
        element: <PrivacyPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <NavbarOnlyLayout />,
    children: [
      {
        path: "/konto",
        element: <AccountPage />,
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
