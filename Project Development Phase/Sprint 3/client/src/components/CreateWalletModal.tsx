import { Form, Formik } from "formik";
import React, { useState } from "react";
import { VIEWS } from "../constants/Views";
import { useAuth, useViews, useWallet } from "../hooks";
import Modal from "./common/Modal";
import * as Yup from "yup";
import InputText from "./common/InputText";
import Button from "./common/Button";
import Loader from "./common/Loader";

const CreateWalletModal = () => {
  const views = useViews();
  const wallet = useWallet();
  const user = useAuth();

  const [loading, setLoading] = useState(false);

  return (
    <Modal
      label={"Create Your Wallet"}
      modal={views.modal === VIEWS.CREATEWALLETMODAL}
      toggleModal={() => views.goTo(views.from)}>
      <Formik
        initialValues={{
          amount: 0,
          threshold: 0,
        }}
        validationSchema={Yup.object({
          amount: Yup.number()
            .positive("Amount should be positive")
            .required("Required"),
          threshold: Yup.number()
            .positive("Limit should be positive")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          await wallet.create({
            user_id: user.id as number,
            amount: values.amount,
            threshold: values.threshold,
          });
        }}>
        {({
          isSubmitting,
          setFieldValue,
          getFieldMeta,
          getFieldProps,
          values,
        }) => (
          <Form className="">
            <div className="w-full border-border border-[0.5px] pt-4 pb-8 gap-5 flex px-10 flex-col bg-background">
              <main className="w-full flex flex-col gap-4 items-center">
                <InputText
                  label={"Amount"}
                  placeHolder={"000"}
                  callback={(value: string) => {
                    setFieldValue("amount", value);
                  }}
                  mandatory={true}
                  value={values.amount}
                  styles={"w-full"}
                  meta={getFieldMeta("email")}
                  type="number"
                />
                <InputText
                  label={"Limit"}
                  placeHolder={"000"}
                  callback={(value: string) => {
                    setFieldValue("threshold", value);
                  }}
                  mandatory={true}
                  value={values.threshold}
                  styles={"w-full "}
                  meta={getFieldMeta("threshold")}
                  type="number"
                />
                <Button type="submit" onClick={() => {}} styles="mt-4">
                  {loading ? <Loader /> : <span>Create Wallet</span>}
                </Button>
              </main>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateWalletModal;
