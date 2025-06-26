import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { useDatas } from "@/context/DatasContext";
import { useLogin } from "@/context/LoginContext";
import { router } from "expo-router";

const ProfileScreen = () => {
  const { profileData } = useDatas();
  const { logoutUser } = useLogin();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const getImageSource = (imagePath: string) => {
    switch (imagePath) {
      case "@/assets/images/woman-profile.png":
        return require("@/assets/images/woman-profile.png");
      case "@/assets/images/man-profile.png":
        return require("@/assets/images/man-profile.png");
    }
  };
  const handleLogout = () => {
    setShowLogoutModal(false);
    // Logout işlemi
    logoutUser();
    router.replace("../signin");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelLogout}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Profil Bilgileri */}
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
              <Image
                source={getImageSource(useDatas().postData.user.profileImage)}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{useDatas().postData.user.name}</Text>
            <Text style={styles.title}>
              {useDatas().postData.user.location}
            </Text>
          </View>

          {/* Butonlar */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.chatsButton}>
              <Text style={styles.chatsButtonText}>Chats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>

          {/* İstatistikler */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profileData.stats.events}</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profileData.stats.followers}
              </Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {profileData.stats.following}
              </Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Tab Menu */}
          <View style={styles.tabMenu}>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Interests</Text>
            </TouchableOpacity>
          </View>

          {/* Galeri */}
          <View style={styles.gallery}>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={[styles.galleryItem, styles.largeItem]}>
                <Image
                  source={{ uri: profileData.galleryImages[0] }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.galleryItem,
                  styles.smallItem,
                  { backgroundColor: "#E6A98A" },
                ]}
              >
                <Image
                  source={{ uri: profileData.galleryImages[1] }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.galleryRow}>
              <TouchableOpacity style={[styles.galleryItem, styles.mediumItem]}>
                <Image
                  source={{ uri: profileData.galleryImages[2] }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.galleryItem, styles.mediumItem]}>
                <Image
                  source={{ uri: profileData.galleryImages[3] }}
                  style={styles.galleryImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // Ana Container
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },

  // Header Stilleri
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1a1a1a",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },

  // İçerik Alanı
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Profil Bölümü
  profileSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    color: "#888",
    fontSize: 16,
  },

  // Buton Bölümü
  buttonSection: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 30,
  },
  chatsButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  chatsButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  connectButton: {
    flex: 1,
    backgroundColor: "#093C71",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  connectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // İstatistik Bölümü
  statsSection: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 25,
    marginBottom: 30,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    color: "#888",
    fontSize: 14,
  },

  // Tab Menu
  tabMenu: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  tabText: {
    color: "#888",
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
  },

  // Galeri Bölümü
  gallery: {
    marginBottom: 20,
  },
  galleryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  galleryItem: {
    borderRadius: 15,
    overflow: "hidden",
  },
  largeItem: {
    flex: 2,
    height: 200,
  },
  smallItem: {
    flex: 1,
    height: 200,
  },
  mediumItem: {
    flex: 1,
    height: 150,
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "#dc3545",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
