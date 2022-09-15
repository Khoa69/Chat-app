import React, { Suspense } from "react";
import { Route, BrowserRouter as Router,Routes } from "react-router-dom";
import Loading from "../components/loading/Loading.component";
import { history } from "../helpers/history";
import { routes } from "./routes";
import * as st from "./Slayout.style";

const loading =<Loading type='spin' color="blue" height={100} width={100}/>;


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
