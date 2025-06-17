import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface PostImageProps {
  mainImage: string;
}

const PostImage: React.FC<PostImageProps> = ({ mainImage }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: mainImage }}
        style={styles.mainImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    height: width * 1.2,
    borderRadius: 20,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#333",
  },
});

export default PostImage;
