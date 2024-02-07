import { POST, route } from "awilix-express";
import { Request, Response } from 'express';
import AuthService from "../services/AuthService";

export default class AuthController {
  
  constructor(private readonly authService: AuthService ) {}

  @route('/register')
  @POST()
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const {username, password, role} = req.body;
      const newUser = await this.authService.register(username, password, role);
      const token = this.authService.generateToken(newUser);
      res.status(201).json({token});
      
    } catch (error) {
      if(error instanceof Error) {
        res.status(400).send({error: error.message});
      } else {
        res.status(500).send({error: 'Ocurrio un error inesperado'});
      }
     
    }
  }
}