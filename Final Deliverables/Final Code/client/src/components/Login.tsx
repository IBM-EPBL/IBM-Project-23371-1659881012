import React from "react";
import InputText from "./common/InputText";
import Loader from "./common/Loader";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth, useViews } from "../hooks";
import Button from "./common/Button";
import { VIEWS } from "../constants/Views";

const Login = () => {
  const auth = useAuth();
  const views = useViews();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await auth.login({ email: values.email, password: values.password });
      }}>
      {({
        isSubmitting,
        setFieldValue,
        getFieldMeta,
        getFieldProps,
        values,
      }) => (
        <section className="w-full h-screen flex flex-col gap-20 items-center justify-center mx-auto bg-gray bg-opacity-50">
          <h1 className="text-6xl font-bold">
            Track Your <span className="text-accent">Expenses</span>, with ease.
          </h1>
          <Form className="w-1/3 shadow-xl">
            <div className="w-full border-border border-[0.5px] pt-12 pb-8 gap-5 flex px-10 flex-col bg-background rounded-3xl ">
              <header className="text-primary font-medium text-4xl">
                Login
              </header>
              <main className="w-full flex flex-col gap-4 items-center">
                <InputText
                  label={"Email"}
                  placeHolder={"example@email.com"}
                  callback={(value: string) => {
                    setFieldValue("email", value);
                  }}
                  mandatory={true}
                  value={values.email}
                  styles={"w-full "}
                  meta={getFieldMeta("email")}
                  type="email"
                />
                <InputText
                  label={"Password"}
                  placeHolder={"**********"}
                  callback={(value: string) => {
                    setFieldValue("password", value);
                  }}
                  mandatory={true}
                  value={values.password}
                  styles={"w-full "}
                  meta={getFieldMeta("password")}
                  type="password"
                />
                <Button type="submit" onClick={() => {}} styles="w-32 mt-4">
                  {auth.status === "loading" ? <Loader /> : <span>Login</span>}
                </Button>
                <span className="text-secondary">
                  New User?{" "}
                  <button
                    className="text-accent hover:opacity-70"
                    onClick={() => views.goTo(VIEWS.REGISTER)}>
                    Register
                  </button>
                </span>
              </main>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default Login;
