---
title: Adding a Disqus Component to a Gatsby JS Site
date: "2018-01-18"
path: "/disqus-for-gatsby/"
id: "3"
---

[Gatsby JS](https://www.gatsbyjs.org/) is a static site generator that allows you to bulid a site using [React JS](https://reactjs.org/) and [GraphQL](http://graphql.org/). If you haven't heard of it before, I recomend checking it out, it's refreshing to work in such a stripped down environment. In fact, this blog is built with it.

If you want to add commenting capabilities to Gatsby (or any static sitefor that matter), using [Disqus](https://disqus.com/) is a great option as it's 100% clientside, plus it has a gernous [free tier](https://disqus.com/pricing/). Unfortunatley, you can't quite use the [universal install instructions](https://disqus.com/admin/universalcode/) that Disqus provides you with on a Gatsby site. At first I tried putting a variant of the universal snippet into my own component, but ran into some trouble. It worked well while Gatsby was in develop mode (live reloading on a local web server), but blew up my build process when I tried to compile to a static site. Of course it's not impossible to roll your own, but it's a bit more difficult.

An easy alternative is to use the [React Disqus thread component](https://github.com/mzabriskie/react-disqus-thread) built by [Matt Zabriskie](https://github.com/mzabriskie). Here's an example of a simple blog post template that makes use of it:

```javascript
import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import ReactDisqusThread from "react-disqus-thread"

class MyTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const fullPath = get(this.props, 'data.site.siteMetadata.basePath') + get(this.props, 'pathContext.path')
    const postTitle = post.frontmatter.title | siteTitle

    return (
      <div>
        <h1>
          {post.frontmatter.title}
        </h1>
        <p>
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <ReactDisqusThread
          shortname={'your-shortname'}
          identifier={post.frontmatter.id}
          title={`${post.frontmatter.title} | ${siteTitle}`}
          url={fullPath}
          onNewComment={this.handleNewComment}
		/>
      </div>
    )
  }
}

export default MyTemplate

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
```

Of the props that `<ReactDisqusThread>` takes, `identifier` is the only one that really needs attention. It's what Disqus uses to identify a unique post, allowing you to keep comments for that post in the right place. If you're working with a database of some sort, this isn't worth discussing as you can easily use the ID asigned to your blog post by the database. When you're working without a database, as is the case with this site, which is written with markdown, you don't have that luxury.

To get around this, I chose to manually add an ID to the frontmatter portion of each of my blog posts. The front matter for this post looks like this:
```
---
title: Adding a Disqus Component to a Gatsby JS Site
date: "2018-01-18"
path: "/disqus-for-gatsby/"
id: "3"
---
```

Gatsby does provide you with an ID, but it's a concatination of the post date and title. I chose not to use this as those are things that could change in the future. For instance, fixing a typo in a post title that I have already published could cause me to loose comments. That's no good.

Manually incrementing an ID each time you create a new post is kind of gross, but it's simple and gets the job done. It will also make migrating this blog (and it's comments) to a different paltform in the future pretty simple.