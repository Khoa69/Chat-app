

export const utils = {
    validPassword,
    validEmail,
}
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d#.?!@$ %^&*-]{8,}$/;
const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validPassword(password: string) {
    return !!password.match(REGEX_PASSWORD);
}


function validEmail(email: string) {
    const input = String(email).toLowerCase();
    return !!input.match(REGEX_EMAIL);
  }