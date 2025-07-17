'use client';

import { Project } from '@/shared/types';
import { servicesData, serviceDetailsData } from '@/infrastructure/config/services';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollNavigation } from '@/presentation/hooks/useScrollNavigation';
import Button from '@/presentation/components/ui/Button';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { handleSectionNavigation } = useScrollNavigation();
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectedProject) {
        const projectRef = projectRefs.current[selectedProject.id];
        if (projectRef && !projectRef.contains(event.target as Node)) {
          setSelectedProject(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProject]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-screen-2xl mx-auto">
      {servicesData.map((project) => {
        const isSelected = selectedProject?.id === project.id;
        const serviceDetails = serviceDetailsData[project.id] || serviceDetailsData['cloud-solutions'];

        return (
          <div
            key={project.id}
            ref={(el: HTMLDivElement | null) => {
              if (el) projectRefs.current[project.id] = el;
            }}
            className="relative"
            style={{ zIndex: isSelected ? 10 : 0 }}
          >
            {/* Base Card */}
            <div
              className={`bg-white rounded-lg shadow-lg transition-all duration-300 w-full ${
                isSelected ? 'rounded-b-none' : 'hover:scale-[1.01]'
              }`}
            >
              <div 
                onClick={() => setSelectedProject(isSelected ? null : project)}
                className="cursor-pointer h-full"
              >
                <div className="w-full aspect-[160/100] relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover select-none pointer-events-none ${
                      project.adjustments?.includes('object-top') ? 'object-top' :
                      project.adjustments?.includes('object-bottom') ? 'object-bottom' : 'object-center'
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={85}
                    draggable={false}
                    unselectable="on"
                  />
                </div>
                <div className="p-8 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{project.title}</h3>
                      <svg
                        className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${
                          isSelected ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {isSelected && (
              <div
                className={`bg-white shadow-lg transition-all duration-300 overflow-hidden ${
                  isSelected ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{
                  borderTopLeftRadius: '0',
                  borderTopRightRadius: '0',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              >
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {serviceDetails.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {serviceDetails.products.map((method, index) => (
                        <span key={index} className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Implementation Process</h4>
                    <div className="space-y-4">
                      {serviceDetails.process.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <h5 className="font-medium text-gray-800">{step.step}</h5>
                            <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <Link
                        href="/#contact"
                        onClick={(e) => handleSectionNavigation(e, '/#contact')}
                        className="px-6 py-3 text-white rounded-lg transform transition-all duration-300 hover:scale-105"
                      >
                        Schedule Consultation
                      </Link>
                    </Button>
                    {/*
                    <Button>
                      <Link
                        href={`/services/${project.id}`}
                        className="px-6 py-3 text-white rounded-lg transform transition-all duration-300 hover:scale-105"
                      >
                        View Previous Works
                      </Link>
                    </Button>
                    */}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
