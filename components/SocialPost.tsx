import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import UserProfileHeader from "./UserProfileHeader";
import PostImage from "./PostImage";
import PostFooter from "./PostFooter";

const { width } = Dimensions.get("window");

interface UserProfileProps {
  name: string;
  location: string;
  profileImage: string;
}

interface PostImageProps {
  mainImage: string;
}

interface SocialPostProps {
  user: UserProfileProps;
  images: PostImageProps;
  footerUsers: string[];
  onCheckPress?: () => void;
}

const SocialPost: React.FC<SocialPostProps> = ({
  user,
  images,
  footerUsers,
  onCheckPress = () => {},
}) => {
  return (
    <View style={styles.container}>
      <UserProfileHeader
        name={user.name}
        location={user.location}
        profileImage={user.profileImage}
      />
      <View style={styles.imageFooterWrapper}>
        <PostImage mainImage={images.mainImage} />
        <View style={styles.footerOverlap}>
          <PostFooter userImages={footerUsers} onCheckPress={onCheckPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    marginHorizontal: 16,
  },
  imageFooterWrapper: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  footerOverlap: {
    position: "absolute",
    bottom: -50,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});

export default SocialPost;
