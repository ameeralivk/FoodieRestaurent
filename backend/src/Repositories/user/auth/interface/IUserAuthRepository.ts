import { UserDocument } from "../../../../models/user";



export default interface IUserAuthRepository{
    register(name:string,email:string,password:string):Promise<{success:boolean,user:UserDocument}>
    findByEmail(email: string): Promise<UserDocument | null>;

}