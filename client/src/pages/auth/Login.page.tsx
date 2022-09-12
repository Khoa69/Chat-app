import React from 'react'
import SInputComponent from '../../components/s-input/s-input.component';
import * as st from "./Login.style";
import UserIcon from "../../assets/userIcon"
import { useForm } from 'react-hook-form';
const Login:React.FC = () =>{
  const { clearErrors, control, handleSubmit, setError, getValues, formState: { errors } } = useForm();
  const onSubmit = (formData: any) => {
 
  }
  return (
    <st.LoginContainer>
      <st.wrapLoginForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SInputComponent name="username" type="username" placeholder="Type your username" 
        icon={<UserIcon height={20} width={20}/>} label="Username" control={control}/>
      </form>
      </st.wrapLoginForm>
    </st.LoginContainer>
  )
}

export default Login;
