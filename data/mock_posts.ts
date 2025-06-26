import { PostType } from "@/types/PostType";

const mockPosts: { [key: string]: PostType } = {
  "1": {
    eventTypeID: "event",
    title: "BWL&WI Career Summit",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    date: "2023-10-01",
    time: "10:00",
    location:
      "Marmara University, Faculty of Economics and Administrative Sciences",
    tags: ["Career", "Event", "Marmara University"],
    attendees: 150,
    maxAttendees: 200,
    isFree: true,
    isOnline: false,
    isRegistered: false,
    registrationLink: "https://example.com/register",
    isLiked: false,
    onLikePress: () => console.log("Like pressed"),
    onPress: () => console.log("Post 1 pressed"),
    // Extra information
    eventType: "Career Event",
    eventCategory: "Business World",
    eventUrl: "https://example.com/event",
    eventImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
    eventColor: "#4CAF50",
    eventIcon: "briefcase",
    eventDuration: "3 hours",
    eventOrganizer: "Marmara University Career Center",
    eventOrganizerUrl: "https://kariyer.marmara.edu.tr",
    eventOrganizerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    eventDescription:
      "The BWL&WI Career Summit organized at Marmara University Faculty of Economics and Administrative Sciences offers a perfect opportunity for students who want to know the business world and discover career opportunities. You will have the opportunity to meet industry professionals, get career tips and learn about the business world.",
    description:
      "This event is organized for those who want to know the business world at Marmara University.",
    author: {
      name: "Ali Koçak",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    },
  },
  "2": {
    eventTypeID: "sale",
    title: "iPhone 16 Pro Max for Sale",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    description: "Brand new, warranty iPhone 16 Pro Max. No trades accepted.",
    price: "25,000 TL",
    isNegotiable: false,
    isAvailable: true,
    contactInfo: {
      phone: "555-123-4567",
      email: "oguzhan",
    },
    isLiked: false,
    onLikePress: () => console.log("Like pressed"),
    onPress: () => console.log("Post 2 pressed"),
    // Extra information
    category: "Electronics",
    subCategory: "Phone",
    condition: "New",
    location: "Istanbul, Turkey",
    tags: ["iPhone", "For Sale", "Electronics"],
    eventType: "Sale",
    eventCategory: "Electronics",
    eventUrl: "https://example.com/sale",
    eventImage:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    eventColor: "#FF5722",
    eventIcon: "phone",
    eventDuration: "Unlimited",
    eventOrganizer: "Oğuzhan Pelit",
    eventOrganizerUrl: "https://example.com/oguzhan",
    eventOrganizerImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    eventDescription:
      "Brand new, warranty iPhone 16 Pro Max for sale. No trades accepted. Hand delivery preferred within Istanbul.",
    author: {
      name: "Oğuzhan Pelit",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    },
  },
  "3": {
    eventTypeID: "event",
    title: "MarmaRun 25!",
    image:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    date: "2025-09-15",
    time: "08:30",
    location: "Marmara University Sports Field",
    tags: ["Running", "Health", "Event"],
    attendees: 230,
    maxAttendees: 300,
    isFree: false,
    isOnline: false,
    isRegistered: false,
    registrationLink: "https://marmarun.com/register",
    isLiked: false,
    onLikePress: () => console.log("Like pressed"),
    onPress: () => console.log("Post 3 pressed"),
    eventType: "Sports Event",
    eventCategory: "Sports",
    eventUrl: "https://marmarun.com",
    eventImage:
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop",
    eventColor: "#388E3C",
    eventIcon: "bicycle",
    eventDuration: "2 hours",
    eventOrganizer: "Marmara Sports Club",
    eventOrganizerUrl: "https://spor.marmara.edu.tr",
    eventOrganizerImage:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=60&h=60&fit=crop&crop=face",
    eventDescription:
      "Take a step towards sports and healthy living at Marmara University with the MarmaRun 25 race! This year, we offer suitable routes for both beginners and experienced with 5 km and 10 km tracks.",
    description:
      "Sports run open to Marmara University students. Participation certificate and surprise gifts!",
    author: {
      name: "Yiğit Ergün",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    },
  },

  "4": {
    eventTypeID: "flatmate",
    title: "Maltepe 2+1 Flatmate",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    category: "Housing",
    subCategory: "Flatmate",
    condition: "Shared Use",
    price: "6,500 TL (Rent)",
    isNegotiable: true,
    isAvailable: true,
    contactInfo: {
      phone: "555-987-6543",
      email: "rabia.kurt@example.com",
    },
    isLiked: false,
    onLikePress: () => console.log("Like pressed"),
    onPress: () => console.log("Post 4 pressed"),
    location: "Maltepe, Istanbul",
    tags: ["Flatmate", "Female", "Maltepe"],
    eventType: "Listing",
    eventCategory: "Flatmate",
    eventUrl: "https://example.com/maltepe-ev",
    eventImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    eventColor: "#8E24AA",
    eventIcon: "home",
    eventDuration: "Indefinite",
    eventOrganizer: "Rabia Kurt",
    eventOrganizerUrl: "https://example.com/user/rabia",
    eventOrganizerImage:
      "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=60&h=60&fit=crop&crop=face",
    eventDescription:
      "Looking for a flatmate for a 2+1 apartment within walking distance to metrobus in Maltepe. The house is fully furnished. Only female candidates can apply.",
    description:
      "Looking for a female flatmate. Someone who is clean, organized and animal-friendly is preferred.",
    author: {
      name: "Rabia Kurt",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b332c217?w=60&h=60&fit=crop&crop=face",
    },
  },
};

export default mockPosts;
