import axios from 'axios';
const apiBaseUrl = "http://localhost:3000/api";

export async function fetchAllProducts() {
  const responseHttp = await axios.get(`${apiBaseUrl}/products`);
  return responseHttp.data;
}

export async function signup(signupV) {
  const responseHttp = await axios.post(`${apiBaseUrl}/signup`, signupV);
  return responseHttp.data;
}

export async function signin(siginpV) {
  const responseHttp = await axios.post(`${apiBaseUrl}/signin`, siginpV);
  return responseHttp.data;
}