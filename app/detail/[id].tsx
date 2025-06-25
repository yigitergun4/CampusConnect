// app/detail/[id].tsx
import mockPosts from "@/data/mock_posts";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";






const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const post = mockPosts[id as string];

  if (!post) return <Text style={styles.notFound}>İçerik bulunamadı.</Text>;

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
              <Text style={styles.item}><Text style={styles.label}>Etkinlik Türü:</Text> {post.eventType}</Text>
              <Text style={styles.item}><Text style={styles.label}>Kategori:</Text> {post.eventCategory}</Text>
              <Text style={styles.item}><Text style={styles.label}>Tarih:</Text> {post.date} {post.time}</Text>
              <Text style={styles.item}><Text style={styles.label}>Yer:</Text> {post.location}</Text>
              <Text style={styles.item}><Text style={styles.label}>Katılımcılar:</Text> {post.attendees}/{post.maxAttendees}</Text>
              <Text style={styles.item}><Text style={styles.label}>Etkinlik Süresi:</Text> {post.eventDuration}</Text>
              <Text style={styles.item}><Text style={styles.label}>Organizatör:</Text> {post.eventOrganizer}</Text>
              <Text style={styles.item}><Text style={styles.label}>Ücretsiz:</Text> {post.isFree ? "Evet" : "Hayır"}</Text>
              <Text style={styles.item}><Text style={styles.label}>Online:</Text> {post.isOnline ? "Evet" : "Hayır"}</Text>
            </>
          ) : post.eventTypeID === "sale" ? (
            <>
              <Text style={styles.item}><Text style={styles.label}>Kategori:</Text> {post.category}</Text>
              <Text style={styles.item}><Text style={styles.label}>Alt Kategori:</Text> {post.subCategory}</Text>
              <Text style={styles.item}><Text style={styles.label}>Durum:</Text> {post.condition}</Text>
              <Text style={styles.item}><Text style={styles.label}>Fiyat:</Text> {post.price}</Text>
              <Text style={styles.item}><Text style={styles.label}>Pazarlık:</Text> {post.isNegotiable ? "Evet" : "Hayır"}</Text>
              <Text style={styles.item}><Text style={styles.label}>Stok:</Text> {post.isAvailable ? "Mevcut" : "Satıldı"}</Text>
              <Text style={styles.item}><Text style={styles.label}>Lokasyon:</Text> {post.location}</Text>
              <Text style={styles.item}>
                <Text style={styles.label}>İletişim:</Text> {post.contactInfo.phone} / {post.contactInfo.email}
              </Text>
            </>
          ) : post.eventTypeID === "flatmate" ? (
            <>
              <Text style={styles.item}><Text style={styles.label}>İçerik Türü:</Text> {post.eventType}</Text>
              <Text style={styles.item}><Text style={styles.label}>Kategori:</Text> {post.eventCategory}</Text>
              <Text style={styles.item}><Text style={styles.label}>Ev Durumu:</Text> {post.condition}</Text>
              <Text style={styles.item}><Text style={styles.label}>Kira:</Text> {post.price}</Text>
              <Text style={styles.item}><Text style={styles.label}>Pazarlık:</Text> {post.isNegotiable ? "Evet" : "Hayır"}</Text>
              <Text style={styles.item}><Text style={styles.label}>Uygunluk:</Text> {post.isAvailable ? "Mevcut" : "Dolu"}</Text>
              <Text style={styles.item}><Text style={styles.label}>Lokasyon:</Text> {post.location}</Text>
              <Text style={styles.item}>
                <Text style={styles.label}>İletişim:</Text> {post.contactInfo.phone} / {post.contactInfo.email}
              </Text>
            </>
          ) : (
          <Text style={styles.item}>İçerik türü tanımlı değil.</Text>
          )
          }

          {/* Etiketler */}
        </View>

        {/* Açıklama */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Açıklama</Text>
          <Text style={styles.description}>
            {post.eventTypeID === "event" ? post.eventDescription : post.description}
          </Text>
        </View>

        {/* Link */}
        {post.eventTypeID === "event" ? (
          <View style={styles.linkRow}>
            <Text style={styles.link} onPress={() => openLink(post.registrationLink)}>
              Kayıt Linki
            </Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => {
              // Uygulama içi kayıt işlemi
              console.log("Uygulama içi kayıt tetiklendi.");
            }}>
              <Text style={styles.registerButtonText}>Uygulama Üzerinden Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.messageButton} onPress={() => {
            // Mesaj atma işlemi
            console.log("Satıcıya mesaj atılıyor...");
          }}>
            <Text style={styles.messageButtonText}>Mesaj At</Text>
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
