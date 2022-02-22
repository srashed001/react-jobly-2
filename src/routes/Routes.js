import { Switch, Route } from "react-router-dom";
import CompanyList from "../companies/CompanyList";
import FilterCompany from "../companies/FilterCompany";
import JobList from "../jobs/JobList";
import PrivateRoute from "./PrivateRoute";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import EditProfileForm from "../Forms/EditProfileForm";
import NotFound from "../NotFound";
import Homepage from "../Homepage";


function Routes({login, signup}) {

  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <PrivateRoute exact path="/companies">
        <CompanyList />
      </PrivateRoute>
      <PrivateRoute exact path="/companies/:handle">
        <FilterCompany />
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
        <JobList />
      </PrivateRoute>
      <Route exact path="/login">
        <LoginForm login={login}/>
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup}/>
      </Route>
      <PrivateRoute exact path="/profile">
        <EditProfileForm />
      </PrivateRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
