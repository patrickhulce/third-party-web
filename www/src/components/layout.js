/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {StaticQuery, graphql} from 'gatsby'

import Sidebar from './sidebar'
import './layout.css'

const Layout = ({children}) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div className="root-layout">
          <Sidebar siteTitle={data.site.siteMetadata.title} />
          <main className="transparent-container">{children}</main>
          <footer className="footer">
            © {new Date().getFullYear()}{' '}
            <a href="https://twitter.com/patrickhulce" target="_blank" rel="noopener">
              @patrickhulce
            </a>
          </footer>
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
