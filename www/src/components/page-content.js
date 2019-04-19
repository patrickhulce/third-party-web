import React from 'react'
import PropTypes from 'prop-types'

const PageContent = ({children}) => {
  return <div style={{margin: '110px auto', maxWidth: 1000}}>{children}</div>
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContent
