import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useDatas } from "@/context/DatasContext";

interface NotificationCardProps {
  image: string;
  title: string;
  description: string;
  rightComponent?: React.ReactNode;
}

const NotificationCard = ({
  image,
  title,
  description,
  rightComponent,
}: NotificationCardProps) => (
  <View style={styles.notificationCard}>
    <View style={styles.left}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
    {rightComponent && <View>{rightComponent}</View>}
  </View>
);

const MessagesScreen = () => {
  const { notifications, placeholderImg } = useDatas();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <FontAwesome name="sliders" size={20} color="white" />
      </View>

      <ScrollView>
        {/* Today's Updates */}
        <Text style={styles.sectionTitle}>Today's updates</Text>
        {notifications
          .filter((notification) => notification.type === "update")
          .map((notification) => (
            <NotificationCard
              key={notification.id}
              image={notification.image}
              title={notification.title}
              description={notification.description}
              rightComponent={
                notification.hasRightComponent ? (
                  notification.rightComponentType === "image" ? (
                    <Image
                      source={{ uri: placeholderImg }}
                      style={styles.thumb}
                    />
                  ) : (
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join</Text>
                    </TouchableOpacity>
                  )
                ) : undefined
              }
            />
          ))}

        {/* Upcoming Events */}
        <Text style={styles.sectionTitle}>Upcoming events</Text>
        {notifications
          .filter((notification) => notification.type === "event")
          .map((notification) => (
            <NotificationCard
              key={notification.id}
              image={notification.image}
              title={notification.title}
              description={notification.description}
            />
          ))}

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent activity</Text>
        {notifications
          .filter((notification) => notification.type === "activity")
          .map((notification) => (
            <NotificationCard
              key={notification.id}
              image={notification.image}
              title={notification.title}
              description={notification.description}
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#121212",
  },
  headerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  headerIcon: {
    color: "white",
    fontSize: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 20,
    marginLeft: 16,
    marginBottom: 6,
    fontWeight: "bold",
  },
  notificationCard: {
    backgroundColor: "#1e1e1e",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  description: {
    color: "white",
  },
  joinButton: {
    backgroundColor: "#007aff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  joinButtonText: {
    color: "white",
    fontSize: 14,
  },
});
