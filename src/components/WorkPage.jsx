import React, { useEffect, useState } from "react";
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
  /* Removed fixed height and added min-height */
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: absolute;
  top: 12rem;
  left: calc(10rem + 15vw);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: white;
  overflow-y: auto;
  max-height: calc(100vh - 12rem - 4rem); /* Adjusted height */
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

const WorkPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />

        <Main>
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

        <Rotate>
          <YinYang width={80} height={80} fill={DarkTheme.text} />
        </Rotate>

        <BigTitlte text="WORK" top="10%" right="20%" />
      </Box>
    </ThemeProvider>
  );
};

export default WorkPage;
