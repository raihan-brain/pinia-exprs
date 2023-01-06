import axios, { type AxiosRequestConfig } from "axios";

/**
 * @param {string} name cookie key name
 * @returns {string} will return cookie value
 */
const getCookies = (name: string): string => {
  let cookieValue = "";
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};
export const useAxios = axios.create({
  baseURL: "/papi/v4/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": getCookies("csrftoken"),
    "X-REQUESTED-WITH": "XMLHttpRequest",
  },
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 && status <= 399;
  },
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // Decorate with custom header to measure response_time
  if (config.headers) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers["request-startTime"] = new Date().getTime();
    // Demo.headers["request_startTime"]
    // if (config.headers.noLoader !== "no-loader") {
    //   LoaderService.showLoader();
    // }
  }

  // EtagService.setEtagHeader(config);
  return config;
};

/**
 * Axios request interceptor, delegating logic to dedicated handlers
 */
useAxios.interceptors.request.use(onRequest);

/**
 * Axios response interceptor, delegating logic to dedicated handlers
 */
// useAxios.interceptors.response.use(onResponse, onResponseError);
