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
  return (
    <st.wrapInput>
      <st.label>{props.label}</st.label>
      {props.icon}
       <Controller
        defaultValue={props.defaultValue ? props.defaultValue : ''}
        name={props.name}
        control={props.control}
        rules={props.rules}
        render={({ field }) =>
          <input
            {...field}
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            readOnly={props.readonly}
            onBlur={() => props.onBlur && props.onBlur()}
            onChange={(e: any) => {
              field.onChange(e);
              props.onChange && props.onChange(e.target.value);
            }}
          />}
      />
    </st.wrapInput>
  )
}
