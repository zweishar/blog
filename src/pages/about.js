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
        <ul>
          <li>
            <p>
              <strong>Name:</strong> Zach Weishar
            </p>
          </li>
          <li>
            <p>
              <strong>Occupation:</strong> Web Developer
            </p>
          </li>
          <li>
            <p>
              <strong>Location:</strong> Austin, Texas
            </p>
          </li>
          <li>
            <p>
              <strong>Employer:</strong> <a href="https://www.isovera.com">Isovera</a>
            </p>
          </li>
          <li>
            <p>
              <strong>Platforms:</strong>
              <ul>
                <li>
                  <a href="https://github.com/zweishar">Github</a>
                </li>
                <li>
                  <a href="https://www.drupal.org/u/zweishar">Drupal.org</a>
                </li>
                <li>
                  <a href="https://twitter.com/ZachWeishar">Twitter</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/zachary-weishar">Linkedin</a>
                </li>
              </ul>
            </p>
          </li>
        </ul>
        <p>This blog is designed to help keep me sharp as a developer. It serves as a center for documentation as I explore new topics. It also scratches an itch to write that I developed during my studies in the field of Journalism.</p>
        <p>I do hope that this material is helpful for others as they follow their own path. If you're one of those people, I would love to hear from you. Feel free to reach out!</p>
        <p>The source code for this site is <a href="https://github.com/zweishar/blog">available on github</a>.</p>
      </div>
    )
  }
}

export default About
