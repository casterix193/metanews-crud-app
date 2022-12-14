import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/articles");
  }, []);

  return null;
};

export default Home;
