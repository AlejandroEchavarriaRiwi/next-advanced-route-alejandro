import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';


const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Puedes ajustar esto según tu necesidad
    }),
});

// Exportar tipos para usar en otros archivos
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
