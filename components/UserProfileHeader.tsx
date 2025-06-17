import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface UserProfileProps {
  name: string;
  location: string;
  profileImage: string;
}

const UserProfileHeader: React.FC<UserProfileProps> = ({
  name,
  location,
  profileImage,
}) => {
  return (
    <View style={styles.userHeader}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userLocation}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 14,
    color: "#cccccc",
  },
});

export default UserProfileHeader;
