import React from 'react';
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";

const ProjectCard = ({ name, img, tech, detail, liveUrl, github, enabled, sequence }) => {
  return (
    <div className="flex gap-8 bg-gray-800 p-4 rounded-md">
      <div className="w-1/3">
        <img src={img} alt={name} className="w-full h-auto rounded-md" />
      </div>
      <div className="w-2/3">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, index) => (
            <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-md">
              {t}
            </span>
          ))}
        </div>
        <p className="mb-4">{detail}</p>
        <div className="flex gap-4">
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
            <BsGithub size={24} />
          </a>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
            <FaGlobe size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;