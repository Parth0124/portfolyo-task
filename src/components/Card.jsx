import React from "react";
import styled from "styled-components";

const CardContainer = styled.li`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.theme.cardBackground};
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.cardTitleColor};
  font-size: 20px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.cardTextColor};
  font-size: 14px;
`;

const Card = ({ data }) => {
  return (
    <CardContainer>
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>
    </CardContainer>
  );
};

export default Card;
