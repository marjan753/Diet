import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../apparent/Colors";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/dietplanet.jpg")}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
        }}
      />

      <View
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
          position: "absolute",
          backgroundColor: "#0000005e",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: Colors.White,
            marginTop: 100,
          }}
        >
          Eat Better, Feel Better
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.White,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          Discover a personalized diet plan and take control of your health today.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/Sign/signin")}
          style={{
            backgroundColor: Colors.Primary,
            paddingVertical: 20,
            paddingHorizontal: 40,
            borderRadius: 25,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
