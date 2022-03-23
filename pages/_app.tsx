import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.scss";
import { socket, SocketContext } from "src/lib/context/socket";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SocketContext.Provider value={socket}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}

export default MyApp;
