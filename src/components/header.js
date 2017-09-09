import React from "react"
import styled from "styled-components"
import { rhythm, scale } from '../utils/typography'
import * as palette from '../utils/variables.js';

const HeaderContainer = styled.div`
  width: 100%;
  background: ${palette.black};
`
const LinkContainer = styled.div`
  max-width: ${rhythm(24)};
  padding: 0 ${rhythm(3 / 4)};
  margin-right: auto;
  margin-left: auto;
`

const Link = styled.a`
  color: white;
  &:hover{
    color: white;
  }
`

class Header extends React.Component {
  render() {

    return (
        <HeaderContainer>
          <LinkContainer>
            <Link href="#">About Me</Link>
          </LinkContainer>
        </HeaderContainer>
    )
  }
}

export default Header
