import { AppRouter } from "./router/AppRouter.jsx";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100 app-bg">
      <AppRouter />
    </div>
  );
};
