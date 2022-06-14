 import { Switch,Route,Redirect } from "react-router-dom";

 import Intro from "../container/intro";
 import Login from "../container/login";
 import Landingpage from "../container/landingpage";
 import Pagenotfound from "./pagenotfound";
 import Password from "../container/password";

 function Router () {
     return(
         <>
            <Switch>
                <Route path="/in" component={Intro} />
                <Route path="/login" component={Login} />
                <Route path="/home" component = {Landingpage}/>
                <Route path="/password/:status" component={Password}/>
                <Route path="/" exact>
                    <Redirect to="/home" />
                </Route>
                <Route path="*" component={Pagenotfound}/>
            </Switch>
         </>
     )
 }

 export default Router;