import styled from 'styled-components'

export const wrapConversation = styled.div`
    display:flex;
    margin-top:15px;
    align-items:center;
    padding:10px;
    width:90%;
    cursor:pointer;
    &:hover {
        background-color: gray;
    }
`

export const conversationImg = styled.img`
    width : 40px;
    height : 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right:20px;
`

export const conversationName = styled.div`
    font-weight:50px;
`