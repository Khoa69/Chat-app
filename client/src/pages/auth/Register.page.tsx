import React from 'react'
import { useNavigate } from "react-router-dom";
import SInputComponent from '../../components/s-input/s-input.component';
import * as st from "./Login.style";
import UserIcon from "../../assets/userIcon"
import { useForm } from 'react-hook-form';
import passwordIcon from "../../assets/passwordIcon.svg";
import { Link } from 'react-router-dom';
import { ErrorMessageEnum } from '../../enums/app.enum';
import { utils } from '../../utils/utils';
import { authService } from '../../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI, registerAPI } from '../../store/auth/authSlice';
import { IauthContext, IauthLogin } from '../../types';
import { toast } from 'react-toastify';
import { storageService } from '../../_helpers';
import { RootState } from '../../store/store';
const Register:React.FC = () =>{
  const { clearErrors, control, handleSubmit, setError, getValues, formState: { errors } } = useForm();
  
  const dispatch = useDispatch<any>();
  let navigate = useNavigate();
  const auth= useSelector<RootState, IauthContext>(state =>state.auth);
  console.log(auth.disabled);

  const onSubmit = async(formData: any) => {
    const data={
      email:formData.email, 
      password: formData.password, 
      name: formData.name,
      re_password: formData.re_password,
    }
    try {
      const result = await dispatch(registerAPI(data));
      toast.success('🦄 Register Success!');
      navigate("/")
    } catch (error) {
      toast.error('🦄 Register Fail!');
    }
  }
  return (
    <st.LoginContainer>
      <st.wrapLoginForm>
      <form onSubmit={handleSubmit(onSubmit)} style={{'marginBottom':'20px'}}>
        <SInputComponent name="name" type="name" placeholder="Type your name" 
        icon={<UserIcon height={20} width={20}/>} label="Name" control={control} error={errors.name}
        rules={{
          required: { value: true, message: ErrorMessageEnum.requiredFieldMessage },
        }}
        />
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
        <SInputComponent name="re_password" type="password" placeholder="Type your Re-password" error={errors.re_password}
        icon={ <img height={20} width={20} src= {passwordIcon}/>} label="Re-password" control={control}
        rules={{
          required: { value: true, message: ErrorMessageEnum.requiredFieldMessage },
          validate: (val: string) => {
            const { password } = getValues()
            return password === val || ErrorMessageEnum.passwordNotmatch
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
        <st.loginButton disabled={auth.disabled} type='submit'>
            Register
        </st.loginButton>
      </form>
      <div style={{'display': 'flex', 'justifyContent':"center"}}>
      <Link style={{'fontFamily': 'Poppins-Regular',
            'fontSize': '14px',
            'lineHeight': 1.7,
            'color':' #666666',
            'textDecoration': 'none',
            }} to="/">
          Have Account? Please Login</Link> 
        </div>
      </st.wrapLoginForm>
    </st.LoginContainer>
  )
}

export default Register;
