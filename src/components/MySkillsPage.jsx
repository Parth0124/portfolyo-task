/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PowerButton from "../subComponents/PowerButton";

const MySkillsPage = forwardRef((props, ref) => {
  const [info, setInfo] = useState([]);
  const [showPowerButton, setShowPowerButton] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae')
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          setInfo(data.user.skills);
          AOS.init();
        }
      })
      .catch(error => console.error(error));

    // Event listener to track scroll position
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setShowPowerButton(currentPosition === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const SkillItem = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative flex flex-col items-center mt-4 shadow-md mx-2"
        style={{
          padding: "10px",
          backgroundColor: "#F2F2F2",
          borderRadius: "8px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={skill.image.url} className="rounded-sm w-20 px-4 mt-4" alt={`skill ${skill.name}`} />
        <p className="text-xl font-bold p-6">{skill.name}</p>
        <div className="bg-[#ADCDCE] h-8 w-full rounded-sm relative">
          <motion.div
            className="bg-[#31363F] h-full absolute inset-0"
            style={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
            initial={{ width: 0 }}
            animate={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
            transition={{ duration: 1 }}
          >
            {isHovered && (
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-[#F2F2F2]">
                {skill.percentage}%
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className="flex flex-col justify-center items-center bg-[#000000] pt-16 pb-16" style={{ borderTop: '17px solid transparent' }}>
      <div className="right-0 p-3 m-2">
        {showPowerButton && <PowerButton />}
      </div>
      <div data-aos="fade-down" className="grid lg:grid-cols-5 grid-cols-2 gap-8 justify-center relative">
        {info &&
          info.slice().reverse().map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
      </div>
    </div>
  );  
});

export default MySkillsPage;