import AuthWrapper from "@/nav-component/AuthWrapper";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
        <AuthWrapper />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
