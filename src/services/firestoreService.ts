
import { collection, addDoc, getDocs, query, orderBy, limit, where, Timestamp, DocumentData } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

// Collection references
const promptsCollection = collection(db, "prompts");
const showcaseCollection = collection(db, "showcase");

// Type definitions
export interface Prompt {
  id?: string;
  title: string;
  content: string;
  authorId: string | null;
  authorName: string;
  createdAt: Timestamp;
  category: string;
  likes: number;
  isAnonymous: boolean;
}

export interface ShowcaseItem {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  authorId: string;
  authorName: string;
  createdAt: Timestamp;
  category: string;
}

// Publish a prompt
export const publishPrompt = async (
  title: string,
  content: string,
  category: string,
  isAnonymous: boolean = false
): Promise<string> => {
  const user = auth.currentUser;
  
  const newPrompt = {
    title,
    content,
    authorId: user ? user.uid : null,
    authorName: isAnonymous ? "Anonymous" : (user ? (user.displayName || "Unknown User") : "Anonymous"),
    createdAt: Timestamp.now(),
    category,
    likes: 0,
    isAnonymous
  };
  
  const docRef = await addDoc(promptsCollection, newPrompt);
  return docRef.id;
};

// Get featured prompts
export const getFeaturedPrompts = async (limitCount = 6): Promise<Prompt[]> => {
  const q = query(
    promptsCollection,
    orderBy("likes", "desc"),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as Prompt;
  });
};

// Get prompts by category
export const getPromptsByCategory = async (category: string, limitCount = 12): Promise<Prompt[]> => {
  const q = query(
    promptsCollection,
    where("category", "==", category),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as Prompt;
  });
};

// Get latest prompts
export const getLatestPrompts = async (limitCount = 10): Promise<Prompt[]> => {
  const q = query(
    promptsCollection,
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as Prompt;
  });
};

// Get showcase items
export const getShowcaseItems = async (): Promise<ShowcaseItem[]> => {
  const q = query(
    showcaseCollection,
    orderBy("createdAt", "desc")
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as ShowcaseItem;
  });
};
