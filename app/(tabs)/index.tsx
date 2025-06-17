import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
} from "react-native";
import SocialPost from "../../components/SocialPost";

const { width, height } = Dimensions.get("window");

interface ProfileImageProps {
  source: ImageSourcePropType;
  style?: any;
}

export default function HomeScreen() {
  const handleCheckPress = () => {
    console.log("Check button pressed!");
  };

  const postData = {
    user: {
      name: "Aslı Ünlü",
      location: "Marmara University",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
    images: {
      mainImage:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=600&fit=crop",
    },
    footerUsers: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <View style={styles.content}>
            <SocialPost
              user={postData.user}
              images={postData.images}
              footerUsers={postData.footerUsers}
              onCheckPress={handleCheckPress}
            />
            <SocialPost
              user={postData.user}
              images={postData.images}
              footerUsers={postData.footerUsers}
              onCheckPress={handleCheckPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 60,
    paddingBottom: 70,
  },
});
