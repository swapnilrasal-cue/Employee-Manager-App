// export interface User{
//     email: string;
//     password: string;
//     name: string;
//     gender :string;
//     date :Date;
//     status: string;
// }
export class User {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public gender: string,
        public date : Date,
        public status: string,
        public loginStatus: boolean = false
    ) { }

    get getPassword() {
        return this.password;
    }
}



export interface AuthResponseData{
    kind : string,
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : Boolean
  
  }