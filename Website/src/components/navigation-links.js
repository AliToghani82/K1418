import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navigation-links.css'

const NavigationLinks = (props) => {
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <Link to="/" className="navigation-links-navlink">
        {props.text}
      </Link>
      <Link to="/account" className="navigation-links-navlink1">
        {props.text1}
      </Link>
      <Link to="/Ranking" className="navigation-links-navlink2">
        {props.text2}
      </Link>
      <Link to="https://buymeacoffee.com/kukikei" className="navigation-links-navlink2">
        Donation
      </Link>
    </nav>
  )
}

NavigationLinks.defaultProps = {
  text: 'Home',
  text1: 'Account',
  text2: 'Ranking',
  text4: 'Blog',
  text3: 'Contact',
  rootClassName: '',
}

NavigationLinks.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text4: PropTypes.string,
  text3: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default NavigationLinks
