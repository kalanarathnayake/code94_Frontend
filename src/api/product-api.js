export const saveProduct = async (product) => {
  try {
    console.log(product, 'aasdfsad');
    const productRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/add`,
      {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await productRes.json();
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const editProduct = async (id, product) => {
  try {
    console.log(product, 'aasdfsad');
    const editProductsRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    return await editProductsRes.json();
  } catch (error) {
    return error.message;
  }
};

export const fetchProducts = async () => {
  try {
    const productsRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/`,
      {
        method: 'GET',
      }
    );

    return await productsRes.json();
  } catch (error) {
    return error.message;
  }
};



export const deleteProduct = async (productId) => {
  try {
    const deleteProductsRes = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${productId}`,
      {
        method: 'DELETE',
      }
    );

    return await deleteProductsRes.json();
  } catch (error) {
    return error.message;
  }
};
