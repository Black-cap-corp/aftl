import { useSelector } from "react-redux";

const getInitialValues = () => {
  const token = sessionStorage.getItem("auth_token");
  return token;
};

export const useAuthHook = () => {
  let token = useSelector((state) => state.auth);
  if (!token) {
    token = getInitialValues();
  }
  return token;
};
