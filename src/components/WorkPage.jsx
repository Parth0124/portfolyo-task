import React, { useEffect, useRef, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import BigTitlte from "../subComponents/BigTitlte";
import ProjectCard from "../subComponents/ProjectCard";
import { YinYang } from "./AllSvgs";
import { DarkTheme } from "./Themes";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  min-height: 100vh; /* Ensure the Box fills at least the entire viewport height */
  position: relative;
  display: flex;
  flex-direction: column; /* Allow content to flow vertically */
  align-items: center; /* Center the content horizontally */
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  
  display: flex;

  color: white;
`;

const Rotate = styled.span`
  display: block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  width: 80px;
  height: 80px;
  z-index: 1;
`;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
};

const WorkPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const yinyang = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjectData(data.user.projects);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const rotate = () => {
      if (ref.current && yinyang.current) {
        ref.current.style.transform = `translateX(${-window.pageYOffset}px)`;
        yinyang.current.style.transform = `rotate(${window.pageYOffset}deg)`;
      }
    };

    window.addEventListener("scroll", rotate);

    return () => {
      window.removeEventListener("scroll", rotate);
    };
  }, []);

  useEffect(() => {
    let element = ref.current;

    const rotate = () => {
      element.style.transform = `translateX(${-window.pageYOffset}px)`;

      return (yinyang.current.style.transform =
        "rotate(" + -window.pageYOffset + "deg)");
    };

    window.addEventListener("scroll", rotate);
    return () => {
      window.removeEventListener("scroll", rotate);
    };
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Main ref={ref} variants={container} initial="hidden" animate="show">
          {loading && (
            <div className="text-center mt-8">Loading projects...</div>
          )}
          {error && (
            <div className="text-center mt-8">Error: {error.message}</div>
          )}
          {!loading && !error && projectData && (
            <div className="fixed top-32 left-1/4 flex flex-col gap-8">
              {projectData.map((project) => (
                <ProjectCard
                  key={project._id}
                  name={project.title}
                  img={project.image.url}
                  tech={project.techStack}
                  detail={project.description}
                  liveUrl={project.liveurl}
                  github={project.githuburl}
                  enabled={project.enabled}
                  sequence={project.sequence}
                />
              ))}
            </div>
          )}
        </Main>

        <Rotate ref={yinyang}>
          <YinYang width={80} height={80} fill={DarkTheme.text} />
        </Rotate>

        <BigTitlte text="WORK" top="10%" right="20%" />
      </Box>
    </ThemeProvider>
  );
};

export default WorkPage;
