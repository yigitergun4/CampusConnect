import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/components/useColorScheme";
import { DatasProvider } from "@/context/DatasContext";
import { LoginProvider } from "@/context/LoginContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [initialRoute, setInitialRoute] = useState<"signin" | "(tabs)" | undefined>(undefined);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed?.email) {
            setInitialRoute("(tabs)");
          } else {
            setInitialRoute("signin");
          }
        } else {
          setInitialRoute("signin");
        }
      } catch (err) {
        console.error("Error parsing user:", err);
        setInitialRoute("signin");
      }
    };

    checkUser();
  }, []);

  // Stack sadece initialRoute ayarlandığında gösterilsin
  if (!initialRoute) {
    return null; // ya da loading spinner
  }

  return (
    <LoginProvider>
      <DatasProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRoute}
          >
            <Stack.Screen name="signin" />
            <Stack.Screen name="register" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </DatasProvider>
    </LoginProvider>
  );
}
