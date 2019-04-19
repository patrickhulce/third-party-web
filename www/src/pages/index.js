import React from 'react'
import {Link} from 'gatsby'

import SEO from '../components/seo'
import DataVisualization from '../components/data-visualization'

const IndexPage = () => (
  <>
    <SEO title="Data" keywords={['third-party', 'report', 'web', 'lighthouse', 'HTTPArchive']} />
    <DataVisualization />
  </>
)

export default IndexPage
