import React from 'react'
import PropTypes from 'prop-types'

const PageContent = ({children}) => {
  return (
    <div
      className="page-content"
      style={{margin: '110px auto 0 auto', maxWidth: 1000, padding: `0 20px`}}
    >
      {children}
    </div>
  )
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PageContent
