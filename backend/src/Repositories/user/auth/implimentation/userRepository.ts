import { BaseRepository } from "../../../IBaseRepository";
import IUserAuthRepository from "../interface/IUserAuthRepository";
import { UserDocument } from "../../../../models/user";
import User from "../../../../models/user";

export class UserAuthRepository extends BaseRepository<UserDocument> implements IUserAuthRepository{
    constructor(){
        super(User)
    }

   async register(name:string,email: string, password: string): Promise<{ success: boolean; user: UserDocument; }> {
        try {
            let res = await this.model.create({
                Name:name,
                Email:email,
                password:password
            })
           
           return {success:true,user:res}

        } catch (error) {
          let err = error as Error
          throw new Error(err.message)
        }
    }
     async findByEmail(email: string): Promise<UserDocument | null> {
    try {
        return await this.model.findOne({ Email: email });
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
}