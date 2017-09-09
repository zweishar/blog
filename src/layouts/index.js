import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import Header from '../components/header'
import MastHead from '../components/masthead'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return (
      <div>
        <Header />
        <Container
          style={{
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <MastHead path={location.pathname} />
          {children()}
        </Container>
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.function,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
