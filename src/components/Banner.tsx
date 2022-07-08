import React from "react"
import styled from "styled-components"

interface Text{
  bold?: boolean
  verb?: boolean
}

const Wrapper = styled.div`
  width: 100%;
  height: 60vh;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBanner = styled.div`
  width: 100%;
  height: 80%;
  background-image: repeating-linear-gradient(to left, #1b8cc5, #41c3ff);
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  align-items: center;
  font-size: 2rem;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  color: #f5f5f5;
`

const StyledTitle = styled.div`
  font-size: 4rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`



const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledText = styled.p<Text>`
  margin: 0.5rem 0;
  font-weight: 400;
  ${props => props.bold && 'font-weight: 900'};
  font-size: ${props => props.verb ? '3.5rem' : '2.5rem'};
`

const Banner = () => {
  return (
    <Wrapper>
      <StyledBanner>
        <StyledTitle>Coin Tracker</StyledTitle>
        <StyledTextContainer>
          <StyledText verb bold >EASY</StyledText>
          <StyledText verb bold >FAST</StyledText>
          <StyledText verb bold >SAFE</StyledText>
        </StyledTextContainer>
        <StyledTextContainer>
          <StyledText>way to track crypto</StyledText>
        </StyledTextContainer>
      </StyledBanner>
    </Wrapper>
  )
}

export default Banner