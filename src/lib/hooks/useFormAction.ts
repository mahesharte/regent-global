import { UseFormReturn, useForm } from "react-hook-form";
import { FormEventHandler, useCallback, useState } from "react";
import axios from "axios";

import { SanityForm } from "@/sanity/types/documents";
import { SanityFormInput, SanityRichtext } from "@/sanity/types/objects";
import { FormAPIResponse } from "@/types/global";

type OnFormSubmit = FormEventHandler<HTMLFormElement>;

type Result = {
  formState: UseFormReturn["formState"];
  message: string;
  onSubmit: OnFormSubmit;
  register: UseFormReturn["register"];
};

export type FormProps = {
  content?: SanityRichtext;
  cta?: string;
  inputs: SanityFormInput[];
  message?: string;
  onSubmit?: OnFormSubmit;
  register?: UseFormReturn["register"];
  state?: UseFormReturn["formState"];
  title?: string;
};

const api = axios.create({
  baseURL: "/api",
});

const useFormAction = (form?: SanityForm | null): Result => {
  const { formState, handleSubmit, register, reset } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit: OnFormSubmit = useCallback(
    (event) => {
      handleSubmit(async (values) => {
        if (!form) {
          return;
        }
        setMessage("");
        const { data } = await api.post<FormAPIResponse>(
          `/${form.action}`,
          values,
        );
        if (data.error) {
          throw new Error(data.message);
        }
        setMessage(data.message);
        reset();
      })(event);
    },
    [form, handleSubmit, reset],
  );

  return {
    formState,
    message,
    onSubmit,
    register,
  };
};

export default useFormAction;
