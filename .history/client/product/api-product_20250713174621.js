/*const create = async (params, credentials, product) => {
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
    let response = await fetch("/api/products/" + params.productId, {
      method: "PUT",
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
const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/products/" + params.productId, {
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
*/

const create = async ({ shopId }, credentials, product) => {
  try {
    const response = await fetch(`/api/products/by/${shopId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: product,
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};

const listByShop = async ({ shopId }, signal) => {
  try {
    const response = await fetch(`/api/products/by/${shopId}`, {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};

const read = async ({ productId }, signal) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "GET",
      signal,
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};

const update = async ({ shopId, productId }, credentials, product) => {
  try {
    const response = await fetch(`/api/product/${shopId}/${productId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: product,
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};

const remove = async ({ productId, shopId }, credentials) => {
  try {
    const response = await fetch(`/api/product/${shopId}/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
    });
    return await response.json();
  } catch (err) {
    return { error: err.message };
  }
};

// ✅ Export all methods together
export { create, listByShop, read, update, remove };
