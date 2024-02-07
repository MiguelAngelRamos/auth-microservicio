import User, { IUser } from "../models/User";

export default class AuthService {
  // registrar
  async register(username: string, password: string, role: string): Promise<IUser> {
    const user = new User({username, password, role});
    await user.save();
    return user;
  }

  // authenticate


  // generate token

  // verifytoken
}