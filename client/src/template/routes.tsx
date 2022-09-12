import React from 'react';
import { Iroute } from '../types';

const HomePage= React.lazy(() => import('../pages/Home/Home.page'));
const LoginPage= React.lazy(() => import('../pages/auth/Login.page'));


export const routes: Iroute[] = [
    { path: '/home', component: HomePage },
    { path: '/', component: LoginPage },
];

