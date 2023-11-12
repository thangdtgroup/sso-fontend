/* ROUTES COMPONENT
   ========================================================================== */

import loadable from "@loadable/component";
import { RouteObject } from "react-router-dom";
import AuthRoute from "../containers/auth/AuthRoute";
import Loading from "../containers/loadable-fallback/loading";
import NotFound from "../containers/not-found";
import ROUTES from "./constant";
import LayoutDefault from "../containers/layouts/default";
import Refreshed from "containers/refreshed";
/**
 * Lazy load page components. Fallback to <Loading /> when in loading phase
 */

const Login = loadable(() => import("../containers/login/index"), {
  fallback: <Loading />,
});

const Register = loadable(() => import("../containers/register/index"), {
  fallback: <Loading />,
});

/**
 * Use <AuthRoute /> to protect authenticate pages
 */
export const routes: RouteObject[] = [
  {
    path: ROUTES.login,
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: ROUTES.register,
    element: <Register />,
  },
  {
    path: ROUTES.refreshed,
    element: <Refreshed />,
  },
  {
    path: ROUTES.home,
    element: (
      <AuthRoute>
        <LayoutDefault />
      </AuthRoute>
    ),
    // children: [
    //   {
    //     path: ROUTES.applicationModification
    //   },
    //   { path: ROUTES.notfound, element: <NotFound /> },
    // ],
  },
];

export default routes;
