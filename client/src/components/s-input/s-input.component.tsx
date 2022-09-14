import React from 'react'
import * as st from "./s-input.style";
import { Controller } from 'react-hook-form';

type SInputInterface = {
  name: any;
  label:string;
  type: string;
  placeholder: string;
  className?: string;
  error?: any;
  control?: any;
  style?: any;
  disabled?: boolean;
  readonly?: boolean;
  onChange?: any;
  onBlur?: any;
  rules?: any;
  defaultValue?: any;
  icon?: JSX.Element;
} 

export default function SInputComponent(props: SInputInterface) {
  const [isForcus,setIsForcus] = React.useState(false);
  return (
    <st.container>
    <st.wrapInput>
      <st.label>{props.label}</st.label>
      <st.wrapInputLine>
        <st.wrapIcon>
          {props.icon}
        </st.wrapIcon>
       <Controller
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        name={props.name}
        control={props.control}
        rules={props.rules}
        render={({ field }) =>
          <st.inputForm
            {...field}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onFocus={()=>setIsForcus(true)}
            readOnly={props.readonly}
            onBlur={() => {props.onBlur && props.onBlur();setIsForcus(false); 
            }}
            onChange={(e: any) => {
              field.onChange(e);
              props.onChange && props.onChange(e.target.value);
            }}
          />}
        />
        </st.wrapInputLine>
    </st.wrapInput>
        {!isForcus&&props.error&&<st.errorMessage>
          {props.error?.message}
        </st.errorMessage>}
    </st.container>
  )
}
