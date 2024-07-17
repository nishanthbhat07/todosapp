import axios from "axios";

export const BASEURL = "https://replicache-backend.vercel.app";
// export const BASEURL = "http://127.0.0.1:8080";

const api = axios.create({
  baseURL: BASEURL,
  headers: {
    Accept: "application/json",
  },
});

export default api;

export const API_ENDPOINTS = {
  spaceIds: "/api/replicache/createSpace",
};
