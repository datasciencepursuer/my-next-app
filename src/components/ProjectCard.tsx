'use client';

import Image from 'next/image';
import { Project } from '@/config/projectRoutes';

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
};

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button
      onClick={() => onSelect(project)}
      className="block w-full text-left"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="relative h-64">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-700">{project.title}</h3>
          <p className="text-gray-700 h-12 line-clamp-2">{project.description}</p>
        </div>
      </div>
    </button>
  );
}