import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

interface PostFooterProps {
  userImages: string[];
  onCheckPress: () => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  userImages,
  onCheckPress,
}) => {
  return (
    <View style={styles.footer}>
      <View style={styles.userImagesContainer}>
        {userImages.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={[
              styles.footerUserImage,
              index > 0 && styles.overlappingImage,
            ]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.checkButton} onPress={onCheckPress}>
        <Text style={styles.checkButtonText}>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#323232",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  overlappingImage: {
    marginLeft: -12,
  },
  checkButton: {
    backgroundColor: "#333333",
    paddingVertical: 10,
    borderRadius: 20,
  },
  checkButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PostFooter;
