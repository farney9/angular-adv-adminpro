import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;


export class UserModel {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get showImageUrl(){
        //localhost:3000/api/uploads/usuario/noimage
        if (this.image.includes('https')) {
            return this.image;
        }
        if (this.image) {
            return `${apiUrl}/uploads/usuario/${this.image}`;
        } else {
            return `${apiUrl}/uploads/usuario/noimage`;
        }
    }
}



// export interface UserModel {
//     name: string,
//     email: string,
//     password?: string,
//     image?: string,
//     google?: boolean,
//     role?: string,
//     uid?: string,
// }
