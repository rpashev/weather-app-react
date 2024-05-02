// REACT
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// CSS
import './index.css';
// LAYOUT
import { BaseLayout } from './layouts/BaseLayout';
// PAGE COMPONENTS
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { WeatherMap } from './pages/WeatherMap';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
// CONTEXT PROVIDERS
import { AuthContextProvider } from './context/user-context';
import { SnackbarProvider } from './context/snackbar-context';
import { SpinnerProvider } from './context/spinner-context';
// TANSTACK QUERY
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SettingsProvider } from './context/settings-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'weather-map',
        element: <WeatherMap />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <SettingsProvider>
    <SnackbarProvider>
      <SpinnerProvider>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthContextProvider>
      </SpinnerProvider>
    </SnackbarProvider>
  </SettingsProvider>
);
