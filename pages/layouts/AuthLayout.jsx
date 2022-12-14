import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { client } from "../../lib/helpers/api";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      router.push("/login");
      toast.error("You must be logged-in to access this page");
      return;
    }

    setToken(accessToken);
    client.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
    axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

    axios
      .get("/api/auth/user")
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        toast.error("Sorry, you need to login again");
        router.push("/login");
      });
  }, []);

  if (!user) return null;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthLayout;
