import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfing";  
import Colors from "../apparent/Colors";

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingUser(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!checkingUser) {
      setTimeout(() => {
        if (user) {
          router.replace("/(tabs)/Home");
        } else {
          router.replace("/"); // اگر فایل index.js در app/ هست
        }
      }, 100);
    }
  }, [checkingUser, user]);

  if (checkingUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.Primary || "#000"} />
      </View>
    );
  }

  // نمایش ساختار اصلی navigation
  return <Stack screenOptions={{ headerShown: false }} />;
}
