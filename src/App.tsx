
import { ThemeProvider } from "./components/theme-provider";
import { GameStateProvider } from "./context/gameStateContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

function App() {
  const renderRoutes = (routes: any) => {
    return routes.map((route: any) => (
      <Route key={route.path} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    ));
  };

  return (
    <>
      <ThemeProvider>
        <GameStateProvider>
          <Router>
            <Routes>{renderRoutes(routes)}</Routes>
          </Router>
        </GameStateProvider>
      </ThemeProvider>
     

    </>
  );
}

export default App;
