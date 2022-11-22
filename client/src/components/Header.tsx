import * as React from 'react'
import { HeaderProp } from '../models/PropsModels'
import styled from 'styled-components'

const Header = (props:HeaderProp) => {
  const {title,to} = props
  return (
    <Navbar>
      <Brand href={to}>{title}</Brand>
    </Navbar>
  )
}

export default Header

const Theme = {
  colors: {
    bg: `#fff`,
    dark: `#24292e`,
    light: `#EEEEEE`,
    red: `#ff5851`,
  },
  fonts: {
    body: `IBM Plex Sans, sans-serif`,
    heading: `IBM Plex Sans, sans-serif`,
  }
}

const Navbar = styled.nav`
  background: ${Theme.colors.dark};
  font-family: ${Theme.fonts.heading};
  color: ${Theme.colors.light};
  display: flex;
  align-items: center;
  justify-content: center;
  a { color: white; text-decoration: none; }`;

const Brand = styled.a`
  font-size: 5rem;
  font-weight: bold;
  font-style: italic;
  margin-left: 1rem;
  padding-right: 1rem;
  background: ${Theme.colors.dark};
  `;



