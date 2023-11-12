import { GoogleOAuthProvider } from "@react-oauth/google";
import { message } from "antd";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { useRoutes, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import store, { Provider } from "./store";
/**
 * Entry point for route component
 * @returns JSX Element represents for route components
 */
const Main = () => {
  useEffect(() => {
    message.config({
      top: 100,
      duration: 2,
      maxCount: 1,
    });
  }, []);
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={
            "1033728110143-2na2oufdpbo31r0o32eafhnrenavk0q6.apps.googleusercontent.com"
          }
        >
          <Main />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
