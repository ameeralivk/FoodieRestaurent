import { UserDocument } from "../../../../models/user";

export default interface IUserAuthRepository {
  register(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; user: UserDocument }>;
  findByEmail(email: string): Promise<UserDocument | null>;
  googleregister(userData: {
    name: String;
    email: String;
    password?: String;
    googleID?: string;
    imageUrl?: string;
  }): Promise<{
    user: UserDocument;
  }>;
  updatePasswordByEmail(
    email: string,
    password: string
  ): Promise<UserDocument | null>;
}
