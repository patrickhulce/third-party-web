import React from 'react'
import {Link, StaticQuery, graphql} from 'gatsby'

import SEO from '../components/seo'
import PageContent from '../components/page-content'

const SecondPage = () => (
  <StaticQuery
    query={graphql`
      query AboutPageQuery {
        allMarkdownRemark {
          edges {
            node {
              html
              frontmatter {
                name
              }
            }
          }
        }
      }
    `}
    render={data => {
      const partials = data.allMarkdownRemark.edges.reduce((map, edge) => {
        map[edge.node.frontmatter.name] = edge.node.html
        return map
      }, {})

      return (
        <PageContent>
          <SEO title="About" />
          <h1>About the Project</h1>
          <h2>Goals</h2>
          <div dangerouslySetInnerHTML={{__html: partials.goals}} />
          <h2>Methodology</h2>
          <div dangerouslySetInnerHTML={{__html: partials.methodology}} />
          <h2>FAQs</h2>
          <div dangerouslySetInnerHTML={{__html: partials.faqs}} />
          <Link to="/">Get back to the data</Link>
        </PageContent>
      )
    }}
  />
)

export default SecondPage
