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
  BlogPage,
} from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { AccountPage } from "./pages/client";
import {
  AdminAccountPage,
  AdminAnimalsPage,
  AdminWorkersPage,
  EditAnimalPage,
} from "./pages/admin";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

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
  // SCIEZKI OGÓLNE //
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
      {
        path: "/blog",
        element: <BlogPage />,
      },
    ],
  },
  {
    path: "/rejestracja",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // SCIEZKI UŻYTKOWNIKA //
  {
    element: (
      <ProtectedRoute requiredRole="UŻYTKOWNIK">
        <NavbarOnlyLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/konto",
        element: <AccountPage />,
      },
    ],
  },
  // SCIEZKI ADMINISTRATORA //
  {
    element: (
      <ProtectedRoute requiredRole="ADMINISTRATOR">
        <NavbarOnlyLayout />
      </ProtectedRoute>
    ),
    path: "/admin",
    children: [
      {
        path: "/admin/konto",
        element: <AdminAccountPage />,
      },
      {
        path: "/admin/zwierzeta",
        element: <AdminAnimalsPage />,
      },
      {
        path: "/admin/zwierzeta/:gatunek/:id/edycja",
        element: <EditAnimalPage />,
      },
      {
        path: "/admin/pracownicy",
        element: <AdminWorkersPage />,
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
