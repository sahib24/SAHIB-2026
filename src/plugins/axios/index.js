import a from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const axios = a.create({
  baseURL: apiUrl,
});

export default axios;
