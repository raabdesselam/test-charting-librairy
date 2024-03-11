import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  withCredentials: false,
  baseURL: "https://api.carbonintensity.org.uk/",
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error.message)
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(
  //to avoid calling .data after calls
  (res: AxiosResponse) => {
    return res.data;
  },
  (error: AxiosError) => {
    console.log("err message", error);

    return errorHandler(error);
  }
);
