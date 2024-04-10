const apiBaseUrl = "http://localhost:3000/api";

export async function fetchAllProducts() {
  const responseHttp = await fetch(`${apiBaseUrl}/products`);
  const products = await responseHttp.json();
  return products;
}