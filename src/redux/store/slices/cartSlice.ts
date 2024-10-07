import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store'; // Asegúrate de que esta ruta de importación sea correcta
import { IProduct } from '@/interfaces/productsInterfaces';


export interface CartItem extends IProduct {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    products: IProduct[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    products: [],
    status: 'idle',
    error: null,
};

export const fetchProducts = createAsyncThunk<IProduct[]>(
    'cart/fetchProducts',
    async () => {
        const response = await fetch('api/post');
        return response.json();
    }
);

// Definimos un tipo para la acción HYDRATE
type HydrateAction = PayloadAction<RootState, typeof HYDRATE>;

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action: HydrateAction) => {
                return {
                    ...state,
                    ...action.payload.cart,
                };
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;