const create = async (params, credentials, product) => {
  try {
    let response = await fetch("/api/products/by/" + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: product,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const list = async (signal) => {
  try {
    let response = await fetch("/api/products", {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const listByOwner = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/products/by/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const read = async (params, signal) => {
  try {
    let response = await fetch("/api/product/" + params.productId, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const update = async (params, credentials, product) => {
  try {
    let response = await fetch("/api/products/" + params.shopId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: shop,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/shops/" + params.shopId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
export { create, list, listByOwner, read, update, remove };
