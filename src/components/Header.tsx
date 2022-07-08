import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import useStore from "../store"
import FavoriteCoinsBar from "./FavoriteCoinsBar"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const StyledHeader = styled.header`
  margin: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`

const StyledLogoLink = styled(Link)`
  width: 40%;
  color: #0284c7;
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 0.25rem;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  text-decoration: none;
`

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  width: 60%;
  margin: 0 1.5rem;
`

const StyledLink = styled(Link)`
  margin: 0 1rem;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  color: #313131;
  :hover {
    color: gray;
  }
  cursor: pointer;
  text-decoration: none;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

const StyledInput = styled.input`
  border: 2px solid #0284c7;
  border-radius: 4px;
  height: 2rem;
  background: transparent;
  margin: 0 1rem;
  color: #313131;
  padding-left: 1rem;
  outline: none;
  font-size: 1rem;
`

const StyledSubmit = styled.input`
  height: 2rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-left: -0.5rem;
  border: 2px solid #0284c7;
  color: #0284c7;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: #0284c7;
    color: #f5f5f5;
  }
`

const StyledLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #00a0f0;
`

const Header = () => {
  const [coin, setCoin] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoin(e.target.value)
  }

  return (
    <Wrapper>
      <StyledHeader>
        <StyledLogoLink to={'/'}>Coin Tracker</StyledLogoLink>
        <StyledNav>
          <StyledLink to="/allcoins/1">All Coins</StyledLink>
          <StyledForm>
            <StyledInput
              placeholder="Search Coins"
              type="text"
              id="coin"
              name="coin"
              onChange={handleChange}
              value={coin} />
            <StyledLink to={`/search/${coin}`}>
              <StyledSubmit type='submit' value='Search' />
            </StyledLink>
          </StyledForm>
        </StyledNav>
      </StyledHeader>
      <StyledLine />
      <FavoriteCoinsBar />
    </Wrapper>
  )
}

export default Header