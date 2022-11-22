import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useAuth, useExpenses, useWallet } from "../hooks";
import Button from "./common/Button";
import InputText from "./common/InputText";
import Loader from "./common/Loader";
import * as Yup from "yup";
import SelectInput from "./common/SelectInput";

const AddExpenses = () => {
  const user = useAuth();
  const wallet = useWallet();
  const expenses = useExpenses();

  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        title: "",
        remarks: "",
        category: expenses.category_spent[0],
        amount: 0,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        amount:
          Yup.number()
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, setFieldValue }) => {
        setLoading(true);
        await expenses
          .add({
            user_id: user.id as number,
            title: values.title,
            remarks: values.remarks,
            category: values.category["title"],
            amount: values.amount,
          })
          .then(() => {
            expenses.get(user.id as number);
            expenses.fetchCategories(user.id as number);
            wallet.get(user.id as number);
            setLoading(false);
            setFieldValue("title", "");
            setFieldValue("category", expenses.category_spent[0]);
            setFieldValue("amount", 0);
          });
      }}>
      {({
        isSubmitting,
        setFieldValue,
        getFieldMeta,
        getFieldProps,
        values,
      }) => (
        <Form className="w-full">
          <div className="w-full border-border border-[0.5px] pt-8 pb-8 gap-5 flex px-10 flex-col bg-background rounded-3xl ">
            <header className="text-primary font-medium text-4xl">
              Track Your Expenses
            </header>
            <main className="w-full flex flex-col gap-4 items-center">
              <InputText
                label={"Title"}
                placeHolder={"Brunch"}
                callback={(value: string) => {
                  setFieldValue("title", value);
                }}
                mandatory={true}
                value={values.title}
                styles={"w-full "}
                meta={getFieldMeta("title")}
                type="text"
              />
              <SelectInput
                value={values.category}
                setter={(value: any) => {
                  setFieldValue("category", value);
                }}
                valueMap={expenses.category_spent}
                label={"Category"}
                mandatory={true}
                styles={""}
              />
              <InputText
                label={"Amount"}
                placeHolder={"0000"}
                callback={(value: string) => {
                  setFieldValue("amount", value);
                }}
                mandatory={true}
                value={values.amount}
                styles={"w-full "}
                meta={getFieldMeta("amount")}
                type="number"
              />
              <Button type="submit" onClick={() => {}} styles="w-32 mt-4">
                {loading ? <Loader /> : <span>Add</span>}
              </Button>
            </main>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddExpenses;
