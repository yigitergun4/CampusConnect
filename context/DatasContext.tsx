import React, { createContext, useContext, useState, ReactNode } from "react";

// Type definitions
interface User {
  name: string;
  location?: string;
  profileImage: string;
}

interface PostData {
  user: User;
  images: {
    mainImage: string;
  };
  footerUsers: string[];
}

interface ProfileData {
  name: string;
  title: string;
  avatar: string;
  stats: {
    events: number;
    followers: number;
    following: number;
  };
  galleryImages: string[];
}

interface NotificationData {
  id: string;
  image: string;
  title: string;
  description: string;
  type: "update" | "event" | "activity";
  hasRightComponent?: boolean;
  rightComponentType?: "image" | "button";
}

interface DatasContextType {
  postData: PostData;
  profileData: ProfileData;
  notifications: NotificationData[];
  placeholderImg: string;
  setPostData: (data: PostData) => void;
  setProfileData: (data: ProfileData) => void;
  setNotifications: (data: NotificationData[]) => void;
}

const DatasContext = createContext<DatasContextType | undefined>(undefined);

export const useDatas = () => {
  const context = useContext(DatasContext);
  if (context === undefined) {
    throw new Error("useDatas must be used within a DatasProvider");
  }
  return context;
};

interface DatasProviderProps {
  children: ReactNode;
}

export const DatasProvider: React.FC<DatasProviderProps> = ({ children }) => {
  // Post data from index.tsx
  const [postData, setPostData] = useState<PostData>({
    user: {
      name: "Aslı Ünlü",
      location: "Marmara University",
      profileImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
    images: {
      mainImage:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=600&fit=crop",
    },
    footerUsers: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    ],
  });

  // Profile data from profile.tsx
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Aslı Ünlü",
    title: "Student at Marmara University",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
    stats: {
      events: 23,
      followers: 52,
      following: 17,
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
    ],
  });

  // Notifications data from messages.tsx
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "asli.unlu",
      description: "new event posted",
      type: "update",
      hasRightComponent: true,
      rightComponentType: "image",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "sureyya.erat",
      description: "joined the event",
      type: "update",
      hasRightComponent: true,
      rightComponentType: "button",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "BWL 21",
      description: "asked a question",
      type: "event",
      hasRightComponent: false,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "BWL 21",
      description: "shared a study material",
      type: "event",
      hasRightComponent: false,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "yigitergun",
      description: "liked your event",
      type: "activity",
      hasRightComponent: false,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face",
      title: "yigitergun",
      description: "commented on your post",
      type: "activity",
      hasRightComponent: false,
    },
  ]);

  const placeholderImg =
    "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=150&h=150&fit=crop&crop=face";

  const value: DatasContextType = {
    postData,
    profileData,
    notifications,
    placeholderImg,
    setPostData,
    setProfileData,
    setNotifications,
  };

  return (
    <DatasContext.Provider value={value}>{children}</DatasContext.Provider>
  );
};

export default DatasContext;
