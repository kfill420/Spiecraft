import instanceAxios from './instance';

export async function fetchAllProductsData() {
  const responseHttp = await instanceAxios.get(`/products`);
  return responseHttp.data;
}

export async function fetchCartData() {
  const responseHttp = await instanceAxios.get(`/cart`);
  return responseHttp.data;
}

export async function fetchAllProfileInfos() {
  const responseHttp = await instanceAxios.get(`/products`);
  return responseHttp.data;
}

export async function signup(signupV) {
  const responseHttp = await instanceAxios.post(`/signup`, signupV);
  return responseHttp.data;
}

export async function signin(siginpV) {
  const responseHttp = await instanceAxios.post(`/signin`, siginpV);
  return responseHttp.data;
}