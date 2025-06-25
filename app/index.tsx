import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    // Uygulama açıldığında signin sayfasına yönlendir
    router.replace("/signin");
  }, []);

  // Bu component render edilmez çünkü hemen redirect eder
  return null;
}
