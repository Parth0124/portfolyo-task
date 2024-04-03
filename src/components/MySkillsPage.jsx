import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./Themes";
import { motion } from "framer-motion";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import ParticlesComponent from "../subComponents/ParticleComponent";
import BigTitle from "../subComponents/BigTitlte";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.body};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Main = styled.div`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: 2rem;
  height: 60vh;
  line-height: 1.5;
  cursor: pointer;
  width: 100%
`;

const Description = styled.div`
  color: ${(props) => props.theme.text};
  font-size: calc(0.6em + 1vw);
  padding: 0.5rem 0;

  strong {
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  ul,
  p {
    margin-left: 2rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2rem;
  background: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
`;

const FilledBar = styled(motion.span)`
  height: 100%;
  display: block;
  background: linear-gradient(to right, #000, #fff);
`;

const SkillItem = ({ skill }) => {
  return (
    <div className="overflow-x-hidden">
      <p className="text-sm uppercase font-medium">{skill.name}</p>
      <ProgressBar>
        <FilledBar
          initial={{ width: 0 }}
          animate={{ width: `${skill.percentage}%` }}
          transition={{ duration: 1 }}
        />
      </ProgressBar>
    </div>
  );
};

const MySkillsPage = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSkillsData(data.user.skills);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  // Divide the skillsData array into chunks of 8 items each
  const chunkedSkillsData = skillsData.reduce((acc, _, index) => {
    const chunkIndex = Math.floor(index / 8);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(skillsData[index]);
    return acc;
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Wrapper>
        <LogoComponent theme="light" />
        <SocialIcons theme="light" />
        <PowerButton />
        <ParticlesComponent theme="light" />
        <MainContainer>
          {/* Map over each chunk of skills and render them within their own row */}
          {chunkedSkillsData.map((chunk, rowIndex) => (
            <Row key={rowIndex}>
              {chunk.map((skill, index) => (
                <Main key={index}>
                  <Description>
                    <SkillItem skill={skill} />
                  </Description>
                </Main>
              ))}
            </Row>
          ))}
        </MainContainer>
        <BigTitle text="SKILLS" top="80%" right="30%" />
      </Wrapper>
    </ThemeProvider>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
`;

export default MySkillsPage;
