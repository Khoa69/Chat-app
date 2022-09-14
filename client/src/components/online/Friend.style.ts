import styled from 'styled-components'

export const wrapFriend = styled.div`
    flex:2;
    padding: 10px;
    height: 100%;
`

export const chatOnlineFriend = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
`

export const chatOnlineImgContainer = styled.div`
    position: relative;
    margin-right: 10px;
`

export const chatOnlineImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid white;
`

export const chatOnlineBadge  = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    top: 2px;
    right: 2px;
`
export const chatOnlineName  = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;