import { useEffect, useState } from "react";

const UsePageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check when the entire page is fully loaded
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false); // If already loaded
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return loading;
};

export default UsePageLoader;
