import React from 'react';
import { Iroute } from '../types';

const HomePage= React.lazy(() => import('../pages/Home/Home.page'));
const LoginPage= React.lazy(() => import('../pages/auth/Login.page'));
const RegisterPage= React.lazy(() => import('../pages/auth/Register.page'));


export const routes: Iroute[] = [
    { path: '/', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/home', component: HomePage },
];

