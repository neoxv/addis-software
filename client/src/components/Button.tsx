import React from 'react'
import styled from 'styled-components'
import { ButtonProp } from '../models/PropsModels'

const Button = (props:ButtonProp) => {

  return (
    <Btn onClick={props.handler(props.key)}>{props.title}</Btn>
  )
}

export default Button

const Btn = styled.button`
    font-size: 1em;
    margin: 1em;
    border-radius: 3px;
    &:hover {
        background-color: ${(props) => props.theme.main};
        color:#40454F;
    }
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
`;