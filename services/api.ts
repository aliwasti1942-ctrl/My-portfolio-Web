import { Project, ApiResponse } from '../types';
import { ALL_PROJECTS } from '../data';

// Simulating network delay for mock data fetching
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock in-memory database for stats
const statsStore: Record<string, { views: number; likes: number }> = {};
// Initialize stats from data
ALL_PROJECTS.forEach(p => {
  statsStore[p.id] = { 
    views: p.stats?.views || 0, 
    likes: p.stats?.likes || 0 
  };
});

export const PortfolioService = {
  // Fetch all projects with optional filtering simulation
  getProjects: async (category?: string): Promise<ApiResponse<Project[]>> => {
    await delay(600); // Simulate API latency
    
    let data = ALL_PROJECTS;
    if (category && category !== 'All') {
      data = ALL_PROJECTS.filter(p => p.category === category);
    }
    
    return {
      success: true,
      data: data
    };
  },

  // Fetch single project details
  getProjectById: async (id: string): Promise<ApiResponse<Project>> => {
    await delay(300);
    const project = ALL_PROJECTS.find(p => p.id === id);
    if (project) {
      return { success: true, data: project };
    }
    return { success: false, message: 'Project not found' };
  }
};

export const StatsService = {
  incrementView: async (id: string): Promise<number> => {
    await delay(200);
    if (statsStore[id]) {
      statsStore[id].views += 1;
      return statsStore[id].views;
    }
    return 0;
  },

  getStats: async (id: string): Promise<{ views: number; likes: number }> => {
    await delay(200);
    return statsStore[id] || { views: 0, likes: 0 };
  },

  incrementLike: async (id: string): Promise<boolean> => {
    await delay(200);
    if (statsStore[id]) {
      statsStore[id].likes += 1;
      return true;
    }
    return false;
  }
};