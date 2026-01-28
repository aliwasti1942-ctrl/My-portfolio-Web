import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { StatsService } from '../services/api';
import { X, Calendar, User, Wrench, ExternalLink, Download, Eye, Heart, ChevronLeft, ChevronRight, ZoomIn, PlayCircle, Maximize2 } from 'lucide-react';
import { Button } from './UIComponents';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Real-time stats state
  const [views, setViews] = useState(project.stats?.views || 0);
  const [likes, setLikes] = useState(project.stats?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  // Combine main image and gallery images into one array for the lightbox
  const allImages = [project.imageUrl, ...(project.galleryImages || [])];

  // Helper functions for Video Support
  const getStreamableId = (url: string) => {
    const match = url.match(/streamable\.com\/([a-z0-9]+)/);
    return match ? match[1] : null;
  };

  const isVideo = (url: string) => {
    return url.includes('streamable.com') || url.match(/\.(mp4|webm|ogg)$/i);
  };

  const VideoPlayer = ({ url, className = "", autoPlay = false }: { url: string; className?: string; autoPlay?: boolean }) => {
    const streamableId = getStreamableId(url);

    if (streamableId) {
      return (
        <iframe
          src={`https://streamable.com/e/${streamableId}?autoplay=${autoPlay ? '1' : '0'}`}
          className={`w-full h-full border-none ${className}`}
          allow="fullscreen; autoplay"
          title="Video Player"
        />
      );
    }
    
    // Fallback for direct video files
    return (
      <video controls autoPlay={autoPlay} className={`w-full h-full object-contain ${className}`}>
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    );
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle Views and Likes on Mount
  useEffect(() => {
    let mounted = true;

    const initStats = async () => {
      const likedKey = `liked_${project.id}`;
      if (localStorage.getItem(likedKey)) {
        setIsLiked(true);
      }

      const apiViews = await StatsService.incrementView(project.id);
      const { likes: apiLikes } = await StatsService.getStats(project.id);

      if (mounted) {
        setViews(apiViews);
        setLikes(apiLikes);
      }
    };

    initStats();

    return () => { mounted = false; };
  }, [project.id, project.stats]);

  // Handle Like Interaction
  const handleLike = async () => {
    if (isLiked || isLikeLoading) return;
    setIsLikeLoading(true);
    setLikes(prev => prev + 1);
    setIsLiked(true);
    localStorage.setItem(`liked_${project.id}`, 'true');
    await StatsService.incrementLike(project.id);
    setIsLikeLoading(false);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % allImages.length);
        if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.parentElement) {
      target.parentElement.style.display = 'none';
    }
  };

  const navigateLightbox = (direction: 'next' | 'prev', e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    if (direction === 'next') {
        setLightboxIndex((prev) => (prev! + 1) % allImages.length);
    } else {
        setLightboxIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative w-full max-w-5xl h-[90dvh] bg-surface border border-white/10 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden animate-scaleIn">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-primary rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left: Media Column */}
          <div className="w-full md:w-2/3 bg-black flex flex-col overflow-y-auto custom-scrollbar">
            {/* Main Image */}
            <div 
              className="h-64 md:h-[60vh] w-full relative flex-shrink-0 bg-gray-900 group cursor-pointer"
              onClick={() => setLightboxIndex(0)}
            >
              {isVideo(project.imageUrl) ? (
                 <div className="w-full h-full relative">
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                     <PlayCircle className="w-20 h-20 text-white/80" />
                   </div>
                   {/* We use an overlay so click triggers lightbox, rather than playing inline immediately in small view */}
                   <div className="absolute inset-0 z-10"></div>
                 </div>
              ) : (
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                  }}
                />
              )}
              
              {/* Overlay Hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  {isVideo(project.imageUrl) ? (
                    <PlayCircle className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
                  ) : (
                    <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  )}
              </div>
            </div>
            
            {/* Gallery Grid */}
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {project.galleryImages?.map((mediaUrl, idx) => (
                <div 
                  key={`g-${idx}`} 
                  className="aspect-square bg-gray-800 rounded-lg overflow-hidden group cursor-pointer relative border border-white/5 hover:border-primary/50 transition-colors"
                  onClick={() => setLightboxIndex(idx + 1)} // idx + 1 because index 0 is main image
                >
                  {isVideo(mediaUrl) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
                       <PlayCircle className="w-10 h-10 text-white/70 group-hover:text-primary transition-colors z-10" />
                       <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-900 to-black"></div>
                       <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-white">VIDEO</span>
                    </div>
                  ) : (
                    <img 
                      src={mediaUrl} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                      onError={handleImageError}
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center pointer-events-none">
                      {!isVideo(mediaUrl) && (
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details Column */}
          <div className="w-full md:w-1/3 p-6 md:p-8 overflow-y-auto bg-surface/95 border-l border-white/5 custom-scrollbar">
            <div className="mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-3 inline-block">
                {project.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded">#{tag}</span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="prose prose-invert text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {project.description}
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="text-sm font-medium">{project.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Role</p>
                    <p className="text-sm font-medium">{project.role}</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-secondary flex-shrink-0" />
                  <div className="w-full">
                    <p className="text-xs text-gray-500 uppercase">Tools Used</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tools.map(tool => (
                        <span key={tool} className="text-xs bg-white/5 px-2 py-1 rounded">{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Stats Section */}
              <div className="flex items-center justify-between text-sm py-2 px-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex gap-2 items-center text-gray-300">
                  <Eye className="w-4 h-4 text-primary" /> 
                  <span className="font-mono">{views.toLocaleString()}</span> views
                </div>
                <button 
                  onClick={handleLike}
                  disabled={isLiked}
                  className={`flex gap-2 items-center transition-all ${
                    isLiked 
                      ? 'text-red-500' 
                      : 'text-gray-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} /> 
                  <span className="font-mono">{likes.toLocaleString()}</span> likes
                </button>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {project.demoLink && (
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="w-full">
                    <Button className="w-full" variant="secondary">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </Button>
                  </a>
                )}
                {project.downloadLink && (
                  <a href={project.downloadLink} target="_blank" rel="noreferrer" className="w-full">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" /> Download Assets
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center animate-fadeInUp backdrop-blur-xl">
            {/* Lightbox Close */}
            <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-4 right-4 z-[210] p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Navigation Left */}
            <button 
                onClick={(e) => navigateLightbox('prev', e)}
                className="absolute left-2 md:left-8 z-[210] p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            >
                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            {/* Navigation Right */}
            <button 
                onClick={(e) => navigateLightbox('next', e)}
                className="absolute right-2 md:right-8 z-[210] p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            >
                <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
            </button>

            {/* Image/Video Container */}
            <div 
                className="w-full h-full p-4 md:p-12 flex items-center justify-center"
                onClick={() => setLightboxIndex(null)}
            >
                {isVideo(allImages[lightboxIndex]) ? (
                  <div 
                    className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()} // Allow clicking controls without closing
                  >
                    <VideoPlayer url={allImages[lightboxIndex]} autoPlay={true} />
                  </div>
                ) : (
                  <img 
                      src={allImages[lightboxIndex]} 
                      alt="Full screen view" 
                      className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                      onClick={(e) => e.stopPropagation()}
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                  />
                )}
            </div>
            
            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono bg-black/50 px-3 py-1 rounded-full border border-white/10">
                {lightboxIndex + 1} / {allImages.length}
            </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;