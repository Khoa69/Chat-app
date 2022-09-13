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
    width: 500px;
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

export const loginButton = styled.button`
    margin-top:15px;
    font-family: Poppins-Medium;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-radius:50px;
    border:none;
    cursor: pointer;
    width: 100%;
    height: 50px;
    background: -webkit-linear-gradient(right, #00dbde, #fc00ff, #00dbde, #fc00ff);
`