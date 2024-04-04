import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import BigTitlte from "../subComponents/BigTitlte";
import ProjectCard from "../subComponents/ProjectCard"; // Import ProjectCard component
import { YinYang } from "./AllSvgs";
import { DarkTheme } from "./Themes";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  height: 400vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  height: 40vh;
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

const WorkPage = () => {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae" // Adjust the API endpoint to fetch project data
        );
        const data = await response.json();
        setProjectData(data.projects); // Assuming the projects data is stored under 'projects' in the response
      } catch (error) {
        console.error("Error fetching data:", error);
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
          {projectData &&
            projectData.map((project) => (
              <ProjectCard
                key={project.public_id}
                name={project.name}
                img={project.img}
                tech={project.tech}
                detail={project.detail}
                liveUrl={project.liveUrl}
                github={project.github}
                enabled={project.enabled}
                sequence={project.sequence}
              />
            ))}
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
