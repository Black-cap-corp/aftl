import * as yup from "yup";

export const StocksSchema = yup.object().shape({
  name: yup.string().required("Required"),
  code: yup.number("should be number"),
  unit: yup.string().required("Required"),
});
