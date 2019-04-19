import React from 'react'
import {Link} from 'gatsby'

import SEO from '../components/seo'
import DataVisualization from '../components/data-visualization'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <DataVisualization />
  </>
)

export default IndexPage
