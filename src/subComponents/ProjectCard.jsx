import React from 'react';
import { BsGithub } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";

const ProjectCard = ({ name, img, tech, detail, liveUrl, github, enabled, sequence }) => {
  return (
    <div className="flex flex-col bg-gray-800 p-4 rounded-md w-48 h-auto">
      <div className="w-full h-24 mb-2">
        <img src={img} alt={name} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <div className="flex flex-wrap gap-1 mb-1">
          {tech.map((t, index) => (
            <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm mb-2">{detail}</p>
        <div className="flex gap-1 text-gray-400 hover:text-gray-200 text-sm">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <BsGithub size={16} />
          </a>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <FaGlobe size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
