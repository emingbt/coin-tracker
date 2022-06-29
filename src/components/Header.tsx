import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`

const StyledHeader = styled.header`
  margin: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const StyledLogo = styled.div`
  width: 50%;
  color: #0284c7;
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 0.5rem;
`

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 50%;
  margin: 0 1.5rem;
`

const StyledText = styled.p`
  margin: 0 1rem;
  color: lightgray;
  :hover {
    color: gray;
  }
  cursor: pointer;
`

const StyledInput = styled.input`
  border: 2px solid #0284c7;
  border-radius: 4px;
  height: 2rem;
  background: transparent;
  margin: 0 1rem;
  color: lightgray;
  padding-left: 1rem;
  outline: none;
`

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #0284c7;
`

const Header = () => {
  return (
    <Wrapper>
      <StyledHeader>
        <StyledLogo className="text-3xl w-1/2 text-[#0284c7]">Coin Tracker</StyledLogo>
        <StyledNav className="flex flex-row items-center mx-0 justify-end w-1/2">
          <StyledText className="mx-12">All Coins</StyledText>
          <StyledInput placeholder="Search Coins"></StyledInput>
        </StyledNav>
      </StyledHeader>
      <StyledLine />
    </Wrapper>
  )
}

export default Header