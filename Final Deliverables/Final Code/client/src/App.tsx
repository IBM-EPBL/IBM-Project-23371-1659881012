import React from "react";
import { useViews } from "./hooks";
import { VIEWS } from "./constants/Views";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Authenticate from "./components/Authenticate";

function App() {
  const views = useViews();

  return (
    <div className=" font-roboto-mono h-screen">
      {views.currentView === VIEWS.LOADING && <Authenticate />}
      {views.currentView === VIEWS.LOGIN && <Login />}
      {views.currentView === VIEWS.REGISTER && <Register />}
      {views.currentView === VIEWS.DASHBOARD && <Dashboard />}
    </div>
  );
}

export default App;
