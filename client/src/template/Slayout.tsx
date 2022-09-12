import React, { Suspense } from "react";
import { Route, BrowserRouter as Router,Routes } from "react-router-dom";
import { history } from "../helpers/history";
import { routes } from "./routes";
import * as st from "./Slayout.style";

const loading = <h3>Loading...</h3>;

const SLayout =(props: any) =>{
  return (
    <st.Layout>
    <Router>
        <Suspense fallback={loading}>
          <Routes>
                    {routes.map((route, key) => {
                      let element: JSX.Element = <route.component/>;
                      return <Route key={key} path={route.path} element={element} />
                    })}
          </Routes>
        </Suspense>
    </Router>
    </st.Layout>
  )
}

export default SLayout;
