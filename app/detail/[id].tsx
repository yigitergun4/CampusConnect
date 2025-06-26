// app/detail/[id].tsx
import mockPosts from "@/data/mock_posts";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const post = mockPosts[id as string];

  if (!post) return <Text style={styles.notFound}>Content not found.</Text>;

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Link error:", err));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Başlık ve görsel */}
        <Image source={{ uri: post.image }} style={styles.image} />
        <Text style={styles.title}>{post.title}</Text>

        {/* Yazar */}
        <View style={styles.authorContainer}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{post.author.name}</Text>
        </View>

        {/* Detay Kutusu */}
        <View style={styles.card}>
          {post.eventTypeID === "event" ? (
            <>
              <Text style={styles.item}>
                <Text style={styles.label}>Event Type:</Text> {post.eventType}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Category:</Text> {post.eventCategory}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Date:</Text> {post.date} {post.time}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Location:</Text> {post.location}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Participants:</Text> {post.attendees}
                /{post.maxAttendees}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Event Duration:</Text>{" "}
                {post.eventDuration}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Organizer:</Text>{" "}
                {post.eventOrganizer}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Free:</Text>{" "}
                {post.isFree ? "Yes" : "No"}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Online:</Text>{" "}
                {post.isOnline ? "Yes" : "No"}
              </Text>
            </>
          ) : post.eventTypeID === "sale" ? (
            <>
              <Text style={styles.item}>
                <Text style={styles.label}>Category:</Text> {post.category}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Sub Category:</Text>{" "}
                {post.subCategory}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Condition:</Text> {post.condition}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Price:</Text> {post.price}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Negotiable:</Text>{" "}
                {post.isNegotiable ? "Yes" : "No"}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Stock:</Text>{" "}
                {post.isAvailable ? "Available" : "Sold"}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Location:</Text> {post.location}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Contact:</Text>{" "}
                {post?.contactInfo?.phone} / {post?.contactInfo?.email}
              </Text>
            </>
          ) : post.eventTypeID === "flatmate" ? (
            <>
              <Text style={styles.item}>
                <Text style={styles.label}>Content Type:</Text> {post.eventType}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Category:</Text> {post.eventCategory}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>House Condition:</Text>{" "}
                {post.condition}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Rent:</Text> {post.price}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Negotiable:</Text>{" "}
                {post.isNegotiable ? "Yes" : "No"}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Availability:</Text>{" "}
                {post.isAvailable ? "Available" : "Full"}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Location:</Text> {post.location}
              </Text>
              <Text style={styles.item}>
                <Text style={styles.label}>Contact:</Text>{" "}
                {post?.contactInfo?.phone} / {post?.contactInfo?.email}
              </Text>
            </>
          ) : (
            <Text style={styles.item}>Content type not defined.</Text>
          )}
          {/* Etiketler */}
        </View>
        {/* Açıklama */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {post.eventTypeID === "event"
              ? post.eventDescription
              : post.description}
          </Text>
        </View>
        {/* Link */}
        {post.eventTypeID === "event" ? (
          <View style={styles.linkRow}>
            <Text
              style={styles.link}
              onPress={() => openLink(post?.registrationLink || "")}
            >
              Registration Link
            </Text>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                // Uygulama içi kayıt işlemi
                console.log("In-app registration triggered.");
              }}
            >
              <Text style={styles.registerButtonText}>Register via App</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() => {
              // Mesaj atma işlemi
              console.log("Sending message to seller...");
            }}
          >
            <Text style={styles.messageButtonText}>Send Message</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  authorName: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: "#333",
    borderWidth: 1,
  },
  label: {
    color: "#999",
    fontSize: 14,
    fontWeight: "600",
  },
  item: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A90E2",
    marginBottom: 8,
  },
  description: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 22,
  },
  notFound: {
    marginTop: 100,
    textAlign: "center",
    color: "#fff",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
    flexWrap: "wrap",
  },
  link: {
    color: "#00BFFF",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  registerButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
