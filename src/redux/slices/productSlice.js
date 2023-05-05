import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  saveProduct,
  fetchProducts,
  editProduct,
  deleteProduct,
} from '../../api';

const initialState = {
  selectedProductIdToEdit: '',
  isProductCreated: false,
  createProduct: {},
  products: [],
  filteredProducts: [],
  searchInput: '',
  editProduct: {},
  removeProduct: null,
  error: {
    isError: false,
    message: '',
  },
  loading: false,
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState: initialState,
  reducers: {
    setSelectedProductIdToEdit: (state, action) => {
      state.selectedProductIdToEdit = action.payload;
    },
    resetEditProduct: (state) => {
      state.editProduct = {};
    },
    isProductCreatedReducer: (state) => {
      state.isProductCreated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Action - saveProduct
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isProductCreated = true;
        state.createProduct = { ...state.createProduct, ...action.payload };
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          ...state.error,
          isError: true,
          message: action.error.message,
        };
      })
      // Action - getProducts
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          ...state.error,
          isError: true,
          message: action.error.message,
        };
      })
      // Action - updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.loading = false;
        state.editProduct = {
          ...state.editProduct,
          ...updatedProduct.updatedProduct,
        };
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          ...state.error,
          isError: true,
          message: action.error.message,
        };
      })
      // Action - removeProduct
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.removeProduct = action.payload;
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = {
          ...state.error,
          isError: true,
          message: action.error.message,
        };
      });
  },
});

export const createProduct = createAsyncThunk(
  'productSlice/createProduct',
  async (product) => {
    console.log(product)
    return await saveProduct(product);
  }
);

export const getProducts = createAsyncThunk(
  'productSlice/getProducts',
  async () => {
    return await fetchProducts();
  }
);

export const updateProduct = createAsyncThunk(
  'productSlice/updateProduct',
  async ({ id, product }) => {
    return await editProduct(id, product);
  }
);

export const removeProduct = createAsyncThunk(
  'productSlice/removeProduct',
  async (productId) => {
    return await deleteProduct(productId);
  }
);

export const { setSelectedProductIdToEdit, isProductCreatedReducer, resetEditProduct } =
  productSlice.actions;
export default productSlice.reducer;
