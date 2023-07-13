import Header from "@/Components/Layout/Header";
import ModalProvider from "@/hooks/useModal";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ModalProvider>
        <ToastContainer />
        {!pathname.includes("auth") && <Header />}
        <div className="pt-[9vh]">
          <Component {...pageProps} />
        </div>
      </ModalProvider>
    </QueryClientProvider>
  );
}
