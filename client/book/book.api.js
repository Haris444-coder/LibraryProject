// API calls for Book CRUD operations

// Create a new book (FormData: title, author, genre, year, description, image)
const create = async (formData, token) => {
  try {
    let response = await fetch("/api/books", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const list = async (token) => {
  try {
    let response = await fetch("/api/books", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (bookId, token) => {
  try {
    let response = await fetch(`/api/books/${bookId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (bookId, formData, token) => {
  try {
    let response = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const removeBook = async (bookId, token) => {
  try {
    let response = await fetch(`/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const checkout = async (bookId, token) => {
  try {
    let response = await fetch(`/api/books/checkout/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const returnBook = async (bookId, token) => {
  try {
    let response = await fetch(`/api/books/return/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, list, read, update, removeBook, checkout, returnBook };
