import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


interface Product {
    category: string;
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk<Product, string>(
  'product/fetchProduct',
  async (id) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch';
      });
  },
});

export default productSlice.reducer;
