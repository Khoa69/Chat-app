import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading';
import * as st from "./Loading.style";

type Iloading ={
    type?:LoadingType ,
    color?: string,
    height:number;
    width:number;
}

export default function Loading({ type, color ,height, width}:Iloading) {
  return (
    <st.wrapBox>
      <ReactLoading type={type} color={color} height={100} width={100} />
    </st.wrapBox>
  )
}
