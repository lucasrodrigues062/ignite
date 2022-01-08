import axios, { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

// intercepts requisitions after receive the response
api.interceptors.response.use(
  (response) => {
    // case is sucessuful return response
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === "token.expired") {
        // refresh info about the cookies
        cookies = parseCookies();
        // search for the refresh token
        const { "nextauth.refreshToken": refreshToken } = cookies;
        // contais details of the requests
        let originalConfig = error.config;

        //checks if a refreshing token is executing
        if (!isRefreshing) {
          isRefreshing = true;
          // requests a new jwt
          api
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token } = response.data;

              setCookie(undefined, "nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: "/",
              });

              setCookie(
                undefined,
                "nextauth.refreshToken",
                response.data.refreshToken,
                {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                }
              );

              api.defaults.headers["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token)
              );
              failedRequestsQueue = [];
            })
            .catch((error) => {
              failedRequestsQueue.forEach((request) =>
                request.onSuccess(error)
              );
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
          // since axios can't support async await on interceptors, the return a promise
          return new Promise((resolve, rejects) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                //change the header of request
                originalConfig.headers["Authorization"] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (error: AxiosError) => {
                rejects(error);
              },
            });
          });
        } else {
          signOut()
        }
      }
    }

    return Promise.reject(error)
  }
);
