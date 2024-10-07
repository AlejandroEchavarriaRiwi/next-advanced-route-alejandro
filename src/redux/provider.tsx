
import { Provider } from 'react-redux';
import store from './store';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default RootLayout;
