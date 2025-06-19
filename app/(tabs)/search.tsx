import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

// ============ TYPE DEFINITIONS ============
interface HeaderProps {
  title: string;
  onBookmarkPress: () => void;
}

interface CategoryButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

interface PostCardProps {
  id: string;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  isLiked: boolean;
  onLikePress: () => void;
}

// ============ HEADER COMPONENT ============
const Header: React.FC<HeaderProps> = ({ title, onBookmarkPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onBookmarkPress} style={styles.bookmarkButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// ============ CATEGORY BUTTON COMPONENT ============
const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, isActive && styles.activeCategoryButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryButtonText,
          isActive && styles.activeCategoryButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// ============ POST CARD COMPONENT ============
const PostCard: React.FC<PostCardProps> = ({
  title,
  image,
  author,
  isLiked,
  onLikePress,
}) => {
  return (
    <TouchableOpacity style={styles.postCard}>
      <Image
        source={{ uri: image }}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay} />
      <View style={styles.cardContent}>
        <Text style={styles.postTitle}>{title}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.authorInfo}>
            <Image
              source={{ uri: author.avatar }}
              style={styles.authorAvatar}
            />
            <Text style={styles.authorName}>{author.name}</Text>
          </View>
          <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? "#ff4757" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============ MAIN SEARCH SCREEN COMPONENT ============
const SearchScreen: React.FC = () => {
  // ============ STATE MANAGEMENT ============
  const [activeCategory, setActiveCategory] = useState<string>("Home");
  const [posts, setPosts] = useState<PostCardProps[]>([
    {
      id: "1",
      title: "BWL&WI Kariyer Zirvesi",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      author: {
        name: "Ali Koçak",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      },
      isLiked: false,
      onLikePress: () => handleLikePress("1"),
    },
    {
      id: "2",
      title: "Satılık Iphone 16 Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      author: {
        name: "Oğuzhan Pelit",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      },
      isLiked: false,
      onLikePress: () => handleLikePress("2"),
    },
    {
      id: "3",
      title: "MarmaRun 25!",
      image:
        "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
      author: {
        name: "Yiğit Ergün",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      },
      isLiked: false,
      onLikePress: () => handleLikePress("3"),
    },
    {
      id: "4",
      title: "Maltepe 2+1 Ev Arkadaşı",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      author: {
        name: "Rabia Kurt",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=60&h=60&fit=crop&crop=face",
      },
      isLiked: false,
      onLikePress: () => handleLikePress("4"),
    },
  ]);

  // ============ EVENT HANDLERS ============
  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
    console.log("Selected category:", category);
  };

  const handleBookmarkPress = () => {
    router.push("/messages");
  };

  const handleLikePress = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  // ============ DATA ============
  const categories = ["Home", "Events", "Friend", "Job"];

  // ============ RENDER ============
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Header title="Search" onBookmarkPress={handleBookmarkPress} />
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category}
              title={category}
              isActive={activeCategory === category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        style={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postsGrid}>
          {posts.map((post, index) => {
            // Create a new post object with the onLikePress function
            const postWithHandler = {
              ...post,
              onLikePress: () => handleLikePress(post.id),
            };

            return (
              <View key={post.id} style={styles.postWrapper}>
                <PostCard {...postWithHandler} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ============ STYLES ============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  locationIcon: {
    marginTop: 2,
  },
  bookmarkButton: {
    padding: 5,
  },

  // Categories Styles
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    backgroundColor: "#333",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  activeCategoryButton: {
    backgroundColor: "#093C71",
  },
  categoryButtonText: {
    color: "#999",
    fontSize: 16,
    fontWeight: "500",
  },
  activeCategoryButtonText: {
    color: "#fff",
  },

  // Posts Styles
  postsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  postWrapper: {
    width: (width - 45) / 2, // Account for padding and gap
    marginBottom: 15,
  },
  postCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#333",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  postTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  authorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  authorName: {
    color: "#ccc",
    fontSize: 12,
    flex: 1,
  },
  likeButton: {
    padding: 4,
  },
});

export default SearchScreen;
