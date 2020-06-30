import axios from "axios";

const instance = axios.create({
  baseURL: "https://tasktoday-5e537.firebaseio.com/",
});

export default instance;
