import styled from 'styled-components'

export const LoginContainer = styled.div`
    background-image: url(images/bg-01.jpg);
    width: 100%;
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const wrapLoginForm = styled.div`
    width: 390px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding-bottom: 54px;
    padding-top: 65px;
    padding-left: 55px;
    margin:15px;
    padding-right: 55px;
    @media (max-width: 576px) {
        padding-left:15px;
        padding-right:15px;
    }
`