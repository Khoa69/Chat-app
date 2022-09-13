import styled from 'styled-components'

export const wrapInput = styled.div`
    position: relative;
    width: 100%;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 10px;
`

export const container = styled.div`
    margin-bottom: 23px;
`

export const label = styled.div`
    font-family: Poppins-Regular;
    font-size: 14px;
    color: #333333;
    line-height: 1.5;
    padding-left: 7px;
`

export const inputForm = styled.input`
    font-family: Poppins-Medium;
    font-size: 16px;
    color: #333333;
    display: block;
    width: 100%;
    height: 55px;
    background: transparent;
    padding: 0 7px 0 10px;
    outline: none;
    border: none;
    overflow: visible;
`

export const wrapInputLine = styled.div`
    display:flex;
`

export const wrapIcon = styled.div`
    display:flex;
    align-items: center;
    padding: 10px;
`


export const errorMessage = styled.span`
    font-family: Poppins-Medium;
    font-size: 16px;
    color: #ff3333;
`