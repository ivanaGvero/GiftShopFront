import axios from "axios";

const headers = {
  "Content-type": "application/json",
};

const token = localStorage.getItem("Token");
if (token) {
  headers.Authorization = "Bearer " + token;
}

export default axios.create({
  baseURL: "http://localhost:8083/",
  headers
});