import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ReactDisqusThread from "react-disqus-thread"
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const fullPath = get(this.props, 'data.site.siteMetadata.basePath') + get(this.props, 'pathContext.path')
    const postTitle = post.frontmatter.title | siteTitle

    return (
      <div>
        <Helmet title={postTitle} />
        <h1>
          {post.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ReactDisqusThread
          shortname={'zweishar'}
          identifier={post.frontmatter.id}
          title={`${post.frontmatter.title} | ${siteTitle}`}
          url={fullPath}
          onNewComment={this.handleNewComment}
			  />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
        basePath
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        id
      }
    }
  }
`
