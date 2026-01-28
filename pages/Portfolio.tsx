import React, { useEffect, useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { PortfolioService } from '../services/api';
import { SectionHeading, Button, LoadingSpinner } from '../components/UIComponents';
import ProjectModal from '../components/ProjectModal';
import { Search, Layers } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await PortfolioService.getProjects(activeCategory === 'All' ? undefined : activeCategory);
      if (response.success && response.data) {
        setProjects(response.data);
      }
      setLoading(false);
      setCurrentPage(1); // Reset page on filter change
    };
    fetchData();
  }, [activeCategory]);

  // Client-side search filtering
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories: (ProjectCategory | 'All')[] = ['All', 'Graphics', '3D', 'GameDev'];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="My Portfolio" subtitle="A collection of my creative works." />

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-surface p-4 rounded-xl border border-white/5">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-background hover:bg-white/10 text-gray-400'
              }`}
            >
              {cat === 'GameDev' ? 'Game Dev' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeInUp">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                <Layers className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Portfolio Showcase</h3>
              <p className="text-gray-400 max-w-md">
                Project updates are currently being curated. Check back soon to see the latest work in graphics, 3D, and game development.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className="group relative bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)] animate-fadeInUp opacity-0"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Button size="sm" variant="secondary" onClick={() => setSelectedProject(project)}>
                         View Details
                       </Button>
                    </div>
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-xs font-bold text-white px-2 py-1 rounded border border-white/10">
                      {project.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider text-gray-500 bg-background px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default Portfolio;