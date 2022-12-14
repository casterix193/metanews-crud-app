import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/navbar";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./layouts/AuthLayout";

// create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster />
        {Component.name === "Login" ? (
          <Component {...pageProps} />
        ) : (
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
        )}
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
