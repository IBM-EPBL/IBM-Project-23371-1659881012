import React from "react";
import InputText from "./common/InputText";
import Loader from "./common/Loader";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth, useViews } from "../hooks";
import Button from "./common/Button";
import { VIEWS } from "../constants/Views";

const Register = () => {
  const auth = useAuth();
  const views = useViews();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        await auth.register({
          username: values.username,
          email: values.email,
          password: values.password,
        });
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
                Register
              </header>
              <main className="w-full flex flex-col gap-4 items-center">
                <InputText
                  label={"Username"}
                  placeHolder={"expexto"}
                  callback={(value: string) => {
                    setFieldValue("username", value);
                  }}
                  mandatory={true}
                  value={values.username}
                  styles={""}
                  meta={getFieldMeta("username")}
                  type="text"
                />
                <InputText
                  label={"Email"}
                  placeHolder={"example@email.com"}
                  callback={(value: string) => {
                    setFieldValue("email", value);
                  }}
                  mandatory={true}
                  value={values.email}
                  styles={""}
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
                  styles={""}
                  meta={getFieldMeta("password")}
                  type="password"
                />
                <Button type="submit" onClick={() => {}} styles="w-32 mt-4">
                  {auth.status === "loading" ? (
                    <Loader />
                  ) : (
                    <span>Register</span>
                  )}
                </Button>
                <span className="text-secondary">
                  Already Registerd?{" "}
                  <button
                    className="text-accent hover:opacity-70"
                    onClick={() => views.goTo(VIEWS.LOGIN)}>
                    Login
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

export default Register;
