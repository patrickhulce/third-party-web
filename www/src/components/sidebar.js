import {Link} from 'gatsby'
import PropTypes from 'prop-types'
import React, {useState} from 'react'
import classNames from 'classnames'

import LogoSvg from '../images/logo.svg'

const NavLink = ({href, text}) => (
  <li>
    <Link to={href} activeClassName="active-link">
      {text}
    </Link>
  </li>
)

const Sidebar = ({siteTitle}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <aside
        className={`${classNames('sidebar', {
          'sidebar--expanded': expanded,
        })}`}
      >
        <div className="sidebar__logo">
          <LogoSvg onClick={() => setExpanded(!expanded)} />
        </div>
        <nav className="sidebar__nav">
          <ul style={{margin: 0, padding: 0}}>
            <NavLink href="/" text="Data" />
            <NavLink href="/about" text="About" />
          </ul>
        </nav>
      </aside>
      {expanded ? (
        <div
          onClick={() => setExpanded(false)}
          className="sidebar__clickhole transparent-container"
        />
      ) : null}
    </>
  )
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: ``,
}

export default Sidebar
