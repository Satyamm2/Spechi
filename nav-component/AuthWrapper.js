import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoggedInNavbar from "./LoggedINavbar";
import Navbar from "./Navbar";

export default function AuthWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [session]);

  return <>{isLoggedIn ? <LoggedInNavbar /> : <Navbar />}</>;
}
