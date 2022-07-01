import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20vh;
  width: 100%;
  margin-top: 4rem;
`
const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #0284c7;
`

const StyledTextContainer = styled.div`
height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledAnchor = styled.a`
  color: #0284c7;
  text-decoration: none;
  :hover {
    color: #004669;
  }
`

const Footer = () => {
  return (
    <Wrapper>
      <StyledLine />
      <StyledTextContainer>
        <p>Built by <StyledAnchor href="https://github.com/emingbt">@emingbt</StyledAnchor>, Powered by <StyledAnchor href="https://www.coingecko.com/api">CoinGecko API</StyledAnchor></p>
      </StyledTextContainer>
    </Wrapper>
  )
}

export default Footer