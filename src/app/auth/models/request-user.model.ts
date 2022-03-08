export interface UserRegisterRequest {
    name:   string,
    email:  string,
    password:  string,
  }
export interface UserLoginRequest {
    email:  string,
    password:  string,
    isCheckedRememberme: boolean
  }

  export interface UserRegisterResponse {
    name:   string,
    email:  string,
    password:  string,
    isCheckedTermsOfUse: boolean
  }
  