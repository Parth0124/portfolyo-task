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
  height: 400vh;
  position: relative;
  display: flex;
  align-items: center;
`;

const Main = styled(motion.ul)`
  position: fixed;
  top: 12rem;
  left: calc(10rem + 15vw);
  display: flex;
  flex-direction: column;
  gap: 2rem; // Add gap between ProjectCard components
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
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Here, I've directly used the provided dataset instead of fetching from the API
      const data = {
        success: true,
        user: {
          // ... (other user data)
          projects: [
            {
              liveurl: "#",
              githuburl: "#",
              title: "Project 14",
              sequence: 14,
              image: {
                public_id: "1706285511679-xe7r9t",
                url: "https://portfolio-image-store.s3.ap-south-1.amazonaws.com/1706285511679-xe7r9t",
              },
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
              techStack: ["Reactjs ", " Nextjs ", " Mern ", " CSS"],
              _id: "65b3d9c8d017f6b49c778ca7",
              enabled: true,
            },
            // ... (other projects)
          ],
        },
      };

      setProjectData(data.user.projects);
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
