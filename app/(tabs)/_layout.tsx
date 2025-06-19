import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";

// Custom tab bar icon component
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 28} {...props} />;
}

// Custom tab bar component
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const isAddButton = route.name === "add";

        // Icon mapping
        let iconName: React.ComponentProps<typeof FontAwesome>["name"] = "home";
        let size = 28;

        switch (route.name) {
          case "index":
            iconName = isFocused ? "home" : "home";
            break;
          case "search":
            iconName = isFocused ? "search" : "search";
            break;
          case "add":
            iconName = "plus";
            size = 32;
            break;
          case "messages":
            iconName = isFocused ? "bell" : "bell-o";
            break;
          case "profile":
            iconName = isFocused ? "user" : "user-o";
            break;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tabItem,
              isAddButton && styles.addButton,
              isFocused && !isAddButton && styles.activeTab,
            ]}
            activeOpacity={0.7}
          >
            <TabBarIcon
              name={iconName}
              size={size}
              color={isAddButton ? "#000" : isFocused ? "#fff" : "#666"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#000",
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    paddingTop: 10,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabItem: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 25,
    marginTop: -40,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginLeft: 10,
    marginRight: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  activeTab: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
});
