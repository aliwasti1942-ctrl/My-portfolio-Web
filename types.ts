export type ProjectCategory = 'Graphics' | '3D' | 'GameDev' | 'Video';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  imageUrl: string;
  galleryImages?: string[];
  date: string;
  role: string;
  tools: string[];
  demoLink?: string;
  downloadLink?: string;
  featured?: boolean;
  videoUrl?: string; // Placeholder for video
  modelUrl?: string; // Placeholder for 3D model viewer
  stats?: {
    views: number;
    likes: number;
  };
}

export interface TimelineEvent {
  year: string;
  title: string;
  company?: string;
  description: string;
  icon?: 'work' | 'education' | 'award';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}