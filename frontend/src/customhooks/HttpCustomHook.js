import axios from "axios";

export const useHttp = () => {
  const jwt = sessionStorage.getItem("auth_token");
  return function ({ method, body, url, successFn, errorFn }) {
    switch (method) {
      case "GET":
        axios
          .get(url, {
            headers: {
              authorization: jwt,
            },
          })
          .then(successFn)
          .catch(errorFn);
      case "POST":
        return axios
          .post(url, body, {
            headers: {
              authorization: jwt,
            },
          })
          .then(successFn)
          .catch(errorFn);
    }
  };
};
