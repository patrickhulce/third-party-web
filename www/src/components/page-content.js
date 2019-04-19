import React from 'react'
import PropTypes from 'prop-types'

const PageContent = ({children}) => {
  return <div style={{marginTop: 110, marginLeft: 130}}>{children}</div>
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContent
