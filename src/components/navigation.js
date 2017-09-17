import React from 'react'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import * as palette from '../utils/variables.js'

const Container = styled.div`
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
  &:hover {
    color: ${palette.orange};
  }
  margin: 10px 30px 10px 0;
  display: inline-block;
`

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: true}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }
  
  render() {
    return (
      <Container>
        <LinkContainer>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </LinkContainer>
      </Container>
    )
  }
}

export default Navigation
