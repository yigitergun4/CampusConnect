export interface PostType {
  id?: string;
  eventTypeID: "event" | "sale" | "flatmate";
  title: string;
  image: string;
  date?: string;
  time?: string;
  location?: string;
  tags?: string[];
  attendees?: number;
  maxAttendees?: number;
  isFree?: boolean;
  isOnline?: boolean;
  isRegistered?: boolean;
  registrationLink?: string;

  price?: string;
  isNegotiable?: boolean;
  isAvailable?: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
  };

  category?: string;
  subCategory?: string;
  condition?: string;

  roommateGender?: "Erkek" | "Kadın" | "Farketmez";
  rent?: string;
  roomDetails?: string;
  householdRules?: string[];

  eventType?: string;
  eventCategory?: string;
  eventUrl?: string;
  eventImage?: string;
  eventColor?: string;
  eventIcon?: string;
  eventDuration?: string;
  eventOrganizer?: string;
  eventOrganizerUrl?: string;
  eventOrganizerImage?: string;
  eventDescription?: string;

  description?: string;

  author: {
    name: string;
    avatar: string;
  };

  isLiked: boolean;
  onLikePress: () => void;
  onPress: () => void;
}