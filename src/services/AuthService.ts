import User, { IUser } from "../models/User";
import { sign, verify } from 'jsonwebtoken';
import * as argon2 from 'argon2';

export default class AuthService {
  // registrar
  async register(username: string, password: string, role: string): Promise<IUser> {
    const user = new User({username, password, role});
    await user.save();
    return user;
  }

  // authenticate "login"
  async authenticate(username: string, password: string ): Promise<IUser> {
    const user = await User.findOne({username});
    if(!user) throw new Error('Usuario no encontrado');
    const isMatch = await argon2.verify(user.password, password);
    if(!isMatch) throw new Error('Credenciales incorrectas');
    return user;
  }


  // generate token
  generateToken(user: IUser): string {
    if(!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }
    return sign({
      userId: user._id,
      role: user.role,
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
  }
  // verifytoken

  verifyToken(token: string): any {
    try {
      if(!process.env.JWT_SECRET) {
        throw new Error('la clave secreta del JWT no está definida');
      }
      const decoded = verify(token, process.env.JWT_SECRET);
      return { result: decoded }
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}