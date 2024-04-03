/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const MySkillsPage = forwardRef((props, ref) => {
    const [info, setInfo] = useState([]);

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
                <div className="bg-[#ADCDCE] h-8 w-full rounded-sm ">
                    <motion.div
                        className="bg-[#31363F] h-full "
                        style={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? `${skill.percentage}%` : '0%' }}
                        transition={{ duration: 1 }}
                    >
                        {isHovered && <span className="absolute left-0 bottom-0 ml-5 mb-5 font-semibold text-[#F2F2F2]">{skill.percentage}%</span>}
                    </motion.div>
                </div>
            </motion.div>
        );
    };
    
    return (
        <div ref={ref} className="flex flex-col justify-center items-center bg-[#76ABAE] pt-6 pb-16">
            <div className="">
                <div className="flex justify-center relative z-10 " style={{opacity:0.7}}>
                    <div className=" px-7 py-6 inline-block bg-[#F2F2F2] relative bottom-16" >
                        <h1 className="text-center font-bold  text-3xl text-[##76ABAE] ">SKILLS</h1>
                    </div>
                </div>
                <div data-aos="fade-down" className="grid lg:grid-cols-5 grid-cols-2 gap-8 justify-center relative">
                    {info &&
                        info.slice().reverse().map((skill, index) => (
                            <SkillItem  key={index} skill={skill} />
                        ))}
                </div>
            </div>
        </div>
    );
});

export default MySkillsPage;
