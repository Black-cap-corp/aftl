import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  name: Yup.string().required("This is required"),
  password: Yup.string().required("This is required"),
});
