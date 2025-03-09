
export interface Task {
  id: string;
  title: string;
  location?: string;
  category?: string;
  tag?: string;
  project?: string;
  dueDate?: Date | null;
  completed: boolean;
  important: boolean;
}

export interface Project {
  id: string;
  name: string;
  count: number;
}

export interface UserProfile {
  username: string;
  email: string;
  avatar?: string;
  preferences: {
    darkMode: boolean;
    emailNotifications: boolean;
    soundEffects: boolean;
  }
}
