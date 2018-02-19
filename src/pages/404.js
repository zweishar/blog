import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"
import Helmet from "react-helmet"
import { rhythm } from "../utils/typography"

class fourOfour extends React.Component {
  render() {
    debugger;
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")

    return (
      <div>
        <Helmet title={get(this, "props.data.site.siteMetadata.title")} />
        <h1>Wait a minute</h1>
        <p>The page you're looking for doesn't exist. Do any of these look right?</p>
        <ul>
          {posts.map(post => {
            if (post.node.path !== "/404/") {
              const title = get(post, "node.frontmatter.title") || post.node.path
              return (
                <li>
                  <h3
                    key={post.node.frontmatter.path}
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: "none" }}
                      to={post.node.frontmatter.path}
                    >
                      {post.node.frontmatter.title}
                    </Link>
                  </h3>
                </li>
              )
            }
        })}
        </ul>
      </div>
    )
  }
}

fourOfour.propTypes = {
  route: React.PropTypes.object,
}

export default fourOfour;

export const pageQuery = graphql`
  query recentPosts {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
