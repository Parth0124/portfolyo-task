import React, { useState, useEffect } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import ParticlesComponent from "../subComponents/ParticleComponent";
import BigTitle from "../subComponents/BigTitlte";
import astronaut from "../assets/Images/spaceman.png";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`;
const Spaceman = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 20vw;
  animation: ${float} 4s ease infinite;
  img {
    width: 100%;
    height: auto;
  }
`;
const Main = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);

  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: "Ubuntu Mono", monospace;
  font-style: italic;
`;

const AboutPage = () => {
  const [aboutData, setAboutData] = useState({
    description: '',
    expYear: '',
    address: '',
    phoneNumber: '',
    contactEmail: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAboutData({
          description: data.user.about.description,
          expYear: data.user.about.exp_year,
          address: data.user.about.address,
          phoneNumber: data.user.about.phoneNumber,
          contactEmail: data.user.about.contactEmail
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
        <ParticlesComponent theme="dark" />

        <Spaceman>
          <img src={astronaut} alt="spaceman" />
        </Spaceman>
        <Main>
        {loading && (
        <div className="w-full text-center mt-8">Loading about data...</div>
      )}
      {error && (
        <div className="w-full text-center mt-8">Error: {error.message}</div>
      )}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto mt-8">
          <p className="text-lg">{aboutData.description}</p>
          <p className="text-gray-500">Experience: {aboutData.expYear} years</p>
          <p className="text-gray-500">Address: {aboutData.address}</p>
          <p className="text-gray-500">Phone: {aboutData.phoneNumber}</p>
          <p className="text-gray-500">Email: {aboutData.contactEmail}</p>
        </div>
      )}
        </Main>

        <BigTitle text="ABOUT" top="10%" left="5%" />
      </Box>
    </ThemeProvider>
  );
};

export default AboutPage;
