import { IauthContext } from "../../types";

export const handleLoginPending = (state: IauthContext) => {
    state.loading = true;
    state.error = '';
    state.disabled= true;
}


export const handleLoginFailure = (state: IauthContext, actions:any) => {
    state.loading = false;
    state.error = "Wrong account";
    state.disabled= false;
}

export const handleLoginSuccess = (state: IauthContext, actions:any) => {
    state.loading = false;
    state.error = "";
    state.disabled= false;
    state.user=actions.payload.data.data.user;
}