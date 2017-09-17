import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"

import { rhythm } from "../utils/typography"

class About extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        <h1>About Me</h1>
        <div>
          <p>My name is Zach Weishar, and I'm a developer working for a Boston based agency called <a href="https://www.isovera.com">Isovera</a>. We work primarily with Drupal, creating web applications tailored to meet the needs of our clients.</p>

          <p>I started this blog to document my journey as I continue to expand my knowledge as a developer. I hope others will find this information useful as they embark on their own journeys. If not, at least I was a learning experience for me :)</p>
        </div>
      </div>
    )
  }
}

export default About
