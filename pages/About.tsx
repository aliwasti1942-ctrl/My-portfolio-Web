import React from 'react';
import { WORK_EXPERIENCE, EDUCATION_DATA, PROFILE_INFO } from '../data';
import { SectionHeading } from '../components/UIComponents';
import { Briefcase, GraduationCap, Award, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <SectionHeading title="About Me" subtitle="The person behind the pixels." />

      {/* === Section 1: Intro & Bio === */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative group">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
             <img 
               src="https://i.ibb.co/qMPnRLCW/1760025475999.png" 
               alt="Muhammad Ali Wasti" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-overlay"></div>
          </div>
          {/* Decorative Backing */}
          <div className="absolute -z-10 top-6 -left-6 w-full h-full border-2 border-secondary/30 rounded-2xl hidden md:block group-hover:top-4 group-hover:-left-4 transition-all duration-300"></div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-white">
            Designing Worlds, <br />
            <span className="text-primary">Developing Dreams.</span>
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            {PROFILE_INFO.bio}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {PROFILE_INFO.roles.map((role) => (
              <span key={role} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-secondary font-mono">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* === Section 2: Work Experience (Grid Layout) === */}
      <div className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">Work Experience</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {WORK_EXPERIENCE.map((job, idx) => (
            <div key={idx} className="bg-surface p-6 rounded-xl border border-white/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group">
              <span className="text-xs font-mono text-gray-400 mb-2 block">{job.year}</span>
              <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{job.title}</h4>
              <p className="text-secondary text-sm font-medium mb-4">{job.company}</p>
              <p className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* === Section 3: Story (Visual Break) === */}
      <div className="bg-gradient-to-br from-surface to-background p-8 md:p-12 rounded-2xl border border-white/10 mb-24 relative overflow-hidden text-center">
         <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
         
         <div className="relative z-10 max-w-3xl mx-auto">
            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-6">My Creative Journey</h3>
            <p className="text-xl text-gray-300 italic font-light leading-relaxed">
              "{PROFILE_INFO.story}"
            </p>
         </div>
      </div>

      {/* === Section 4: Education & Skills (Split Layout) === */}
      <div className="grid md:grid-cols-2 gap-16">
        
        {/* Education Column */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-secondary/20 rounded-xl">
              <GraduationCap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-white">Education</h3>
          </div>

          <div className="space-y-8 border-l-2 border-white/10 ml-4 pl-8 relative">
             {EDUCATION_DATA.map((edu, idx) => (
               <div key={idx} className="relative">
                 {/* Timeline Dot */}
                 <div className="absolute -left-[39px] top-1 w-5 h-5 bg-background border-2 border-secondary rounded-full"></div>
                 
                 <h4 className="text-lg font-bold text-white">{edu.title}</h4>
                 <p className="text-primary text-sm mb-2">{edu.company} <span className="text-gray-500 mx-2">•</span> {edu.year}</p>
                 <p className="text-gray-400 text-sm">{edu.description}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Skills Column */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-accent/20 rounded-xl">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-white">Core Competencies</h3>
          </div>

          <div className="bg-surface rounded-xl border border-white/5 p-6">
            <p className="text-gray-400 mb-6 text-sm">
              A balanced mix of technical proficiency and creative intuition across multiple disciplines.
            </p>
            <div className="grid grid-cols-2 gap-4">
               {[
                 { name: 'Graphic Design', level: '95%' },
                 { name: '3D Modeling', level: '90%' },
                 { name: 'Video Editing', level: '85%' },
                 { name: 'Game Dev (Unity)', level: '80%' },
                 { name: 'UI/UX Design', level: '85%' },
                 { name: 'Motion Graphics', level: '75%' },
               ].map((skill) => (
                 <div key={skill.name} className="bg-black/20 p-3 rounded-lg border border-white/5">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-gray-200 text-sm font-medium">{skill.name}</span>
                     <span className="text-primary text-xs">{skill.level}</span>
                   </div>
                   <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                     <div className="bg-primary h-full rounded-full" style={{ width: skill.level }}></div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;