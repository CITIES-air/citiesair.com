// React components
import { React, useState, useMemo, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// MUI components
import { Box } from '@mui/material/';

// Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ThemePreferences from './Themes/ThemePreferences';
import CustomThemes from './Themes/CustomThemes';

// UI components
import ScrollToTop from './Components/ScrollToTop';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import FourOhFour from './Pages/404';
import DeviceOrientationNotification from './Components/SnackBarNotifications';
import LoadingAnimation from './Components/LoadingAnimation';
import LogIn from './Components/Account/LogIn';

// Contexts
import { UserContext } from './ContextProviders/UserContext';
import { TemperatureUnits } from './Pages/Screen/TemperatureUtils';
import { LocalStorage } from './Utils/LocalStorage';
import { UniqueRoutes } from './Utils/RoutesUtils';

// Lazy load pages
const Home = lazy(() => import('./Pages/Home/Home'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const Screen = lazy(() => import('./Pages/Screen/Screen'));

// Create theme design tokens based on theme preference
const getDesignTokens = (themePreference) => ({
  palette: {
    mode: themePreference,
    ...(themePreference === ThemePreferences.dark
      ? {
        ...CustomThemes.dark.palette,
        ...CustomThemes.universal.palette,
        typography: CustomThemes.universal.palette,
      }
      : {
        ...CustomThemes.light.palette,
        ...CustomThemes.universal.palette,
        typography: CustomThemes.universal.palette,
      }),
  },
});

function App() {
  // Set theme preference state based on localStorage or system preference
  const [themePreference, setThemePreference] = useState(
    localStorage.getItem(LocalStorage.theme)
    || (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? ThemePreferences.dark : ThemePreferences.light)
  );
  // Set temperature unit preference state based on localStorage
  const [temperatureUnitPreference, setTemperatureUnitPreference] = useState(
    localStorage.getItem(LocalStorage.temperatureUnit)
    || TemperatureUnits.celsius
  );

  // Create theme using getDesignTokens
  const theme = useMemo(
    () => createTheme(getDesignTokens(themePreference)),
    [themePreference]
  );

  // set backgroundColor of 'body' element depending on theme.
  // this is to set bg-color of left/right padding on landscape iOS devices
  document.body.style.background = theme.palette.customAlternateBackground;

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: 'customBackground',
          }}
        >
          <DeviceOrientationNotification />
          <Suspense fallback={<LoadingAnimation optionalText="Loading Dashboard" />}>
            <Routes>
              <Route
                path={UniqueRoutes.home}
                element={
                  <Box>
                    <Header setThemePreference={setThemePreference} temperatureUnitPreference={temperatureUnitPreference} setTemperatureUnitPreference={setTemperatureUnitPreference} />
                    <Home themePreference={themePreference} temperatureUnitPreference={temperatureUnitPreference} title="CITIESair" />
                    <Footer />
                  </Box>
                }
              />

              <Route
                path={UniqueRoutes.login}
                element={
                  <Box>
                    <Header setThemePreference={setThemePreference} temperatureUnitPreference={temperatureUnitPreference} setTemperatureUnitPreference={setTemperatureUnitPreference} />
                    <LogIn />
                    <Footer />
                  </Box>
                }
              />

              <Route
                path={UniqueRoutes.dashboard}
                element={
                  <Box>
                    <Header setThemePreference={setThemePreference} temperatureUnitPreference={temperatureUnitPreference} setTemperatureUnitPreference={setTemperatureUnitPreference} />
                    <Dashboard themePreference={themePreference} temperatureUnitPreference={temperatureUnitPreference} title="CITIESair | Dashboard" />
                    <Footer />
                  </Box>
                }
              />

              {/* Only nyuad is accessible publicly */}
              <Route
                path={UniqueRoutes.nyuad}
                element={
                  <Box>
                    <Header setThemePreference={setThemePreference} temperatureUnitPreference={temperatureUnitPreference} setTemperatureUnitPreference={setTemperatureUnitPreference} />
                    <Dashboard isNyuad={true} themePreference={themePreference} temperatureUnitPreference={temperatureUnitPreference} title="CITIESair | NYUAD Air Quality" />
                    <Footer />
                  </Box>
                }
              />

              <Route
                path={UniqueRoutes.anyScreen}
                element={<Screen temperatureUnitPreference={temperatureUnitPreference} title="CITIESair | Screen" />}
              />

              <Route path={UniqueRoutes[404]} element={<FourOhFour title="Page Not Found | CITIESair" />} />
              <Route path="*" element={<Navigate replace to={UniqueRoutes[404]} />} />

            </Routes>
          </Suspense>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
