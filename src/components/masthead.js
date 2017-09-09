import React from "react"
import styled from "styled-components"
import { rhythm, scale } from '../utils/typography'

class MastHead extends React.Component {
  render() {
  
    const Wrapper = styled.div`
      margin-bottom: ${rhythm(1)};
    `

    let HeaderText
    let Slug
    if (this.props.path === '/') {
      HeaderText = styled.h1`
        margin-bottom: ${rhythm(.25)};
        margin-top: 0;
      `
      Slug = styled.i`
        margin-bottom: 0;
        font-size: ${rhythm(.65)};
      `
    } else {
      HeaderText = styled.h3`
        font-family: 'Montserrat, sans-serif';
        margin-top: 0;
        margin-bottom: 0;
      `
      Slug = styled.i`
        margin-bottom: 0;
        font-size: ${rhythm(.5)};
      `
    }

    const HeaderLink = styled.a`
      box-shadow: none;
      text-decoration: none;
      color: inherit;
    `

    return (
      <Wrapper>
        <HeaderText>
          <HeaderLink href="/">
            World Wide Web Inspector
          </HeaderLink>
        </HeaderText>
        <Slug>Deep dives into programming topics for inquisitive minds.</Slug>
      </Wrapper>
    )
  }

}

export default MastHead
