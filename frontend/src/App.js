import { useEffect } from "react";
import {BrowserRouter} from "react-router-dom";

// import Landingpage from "./container/landingpage";
import Router from "./component/router";

function App () {

  // useEffect(() => {
  //   auth.onAuth
  // },[])
  return(
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App;