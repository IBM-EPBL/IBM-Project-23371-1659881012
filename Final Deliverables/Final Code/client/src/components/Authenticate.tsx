import React, { useEffect } from "react";
import { useAuth } from "../hooks";
import Loader from "./common/Loader";

const Authenticate = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.init_auth();
  }, []); //eslint-disable-line

  return auth.status === "loading" ? <Loader /> : <></>;
};

export default Authenticate;
