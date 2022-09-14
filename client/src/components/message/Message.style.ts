import styled from 'styled-components'

export interface Props {
    own:boolean;
}

export const wrapMessage = styled.div`
    display:flex;
    flex-direction:column;
    margin-top: 30px;
    align-items: ${(props:Props) => props.own ? 'flex-end' : 'flex-start' };
`
export const messageTop = styled.div`
    display:flex;
`
export const messageImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
export const messageText = styled.div`
    padding: 10px;
    border-radius: 20px;
    background-color: ${(props:Props) => props.own ? 'rgb(245, 241, 241)' : '#1877f2' };
    color: ${(props:Props) => props.own ? 'black' : 'white' };
    max-width: 300px;
`

export const messageBottom = styled.div`
    font-size: 12px;
    margin-top: 10px;
`


