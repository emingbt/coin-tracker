import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  background-color: #ececec;
  width: 100%;
  height: 60vh;
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBanner = styled.div`
  width: 80%;
  height: 80%;
  background-image: repeating-linear-gradient(to left top, #0284c7, #ececec);
  border-radius: 1rem;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-family: Roboto, sans-serif;
  font-weight: 600;
  color: #e6e6e6;
`

const Banner = () => {
  return (
    <Wrapper>
      <StyledBanner>
        Best place to track crypto
      </StyledBanner>
    </Wrapper>
  )
}

export default Banner