import React from 'react'
import {Link} from 'gatsby'

import SEO from '../components/seo'
import PageContent from '../components/page-content'

const SecondPage = () => (
  <PageContent>
    <SEO title="About" />
    <h1>About the Project</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </PageContent>
)

export default SecondPage
