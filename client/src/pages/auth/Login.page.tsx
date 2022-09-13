import React from 'react'
import SInputComponent from '../../components/s-input/s-input.component';
import * as st from "./Login.style";
import UserIcon from "../../assets/userIcon"
import { useForm } from 'react-hook-form';
import passwordIcon from "../../assets/passwordIcon.svg";
import { Link } from 'react-router-dom';
import { ErrorMessageEnum } from '../../enums/app.enum';
import { utils } from '../../utils/utils';
const Login:React.FC = () =>{
  const { clearErrors, control, handleSubmit, setError, getValues, formState: { errors } } = useForm();
  const onSubmit = (formData: any) => {
    
  }
  return (
    <st.LoginContainer>
      <st.wrapLoginForm>
      <form onSubmit={handleSubmit(onSubmit)} style={{'marginBottom':'20px'}}>
        <SInputComponent name="email" type="email" placeholder="Type your email" 
        icon={<UserIcon height={20} width={20}/>} label="Email" control={control} error={errors.email}
        rules={{
          required: { value: true, message: ErrorMessageEnum.requiredFieldMessage },
          validate: (val: string) => {
            return !!utils.validEmail(val) || ErrorMessageEnum.invalidEmail
          }
        }}
        />
        <SInputComponent name="password" type="password" placeholder="Type your password" error={errors.password}
        icon={ <img height={20} width={20} src= {passwordIcon}/>} label="Password" control={control}
        rules={{
          required: { value: true, message: ErrorMessageEnum.requiredFieldMessage },
          validate: (val: string) => {
            return !!utils.validPassword(val) || ErrorMessageEnum.invalidPassword
          }
        }}
        />
        <div style={{'display': 'flex', 'justifyContent':"flex-end"}}>
          <Link style={{'fontFamily': 'Poppins-Regular',
            'fontSize': '14px',
            'lineHeight': 1.7,
            'color':' #666666',
            'textDecoration': 'none',
            'margin': '0px'}} to="home">
          Forgot password?</Link> 
        </div>
        <st.loginButton  type='submit'>
            Login
        </st.loginButton>
      </form>
      <div style={{'display': 'flex', 'justifyContent':"center"}}>
      <Link style={{'fontFamily': 'Poppins-Regular',
            'fontSize': '14px',
            'lineHeight': 1.7,
            'color':' #666666',
            'textDecoration': 'none',
            }} to="home">
          Don&apos;t have Account? Please SignUp</Link> 
          </div>
      </st.wrapLoginForm>
    </st.LoginContainer>
  )
}

export default Login;
