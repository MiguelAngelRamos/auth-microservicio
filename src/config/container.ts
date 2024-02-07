import { asClass, createContainer, InjectionMode } from "awilix";
import AuthService from "../services/AuthService";
import AuthController from "../controllers/AuthController";


const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  authService: asClass(AuthService).singleton(),
  authController: asClass(AuthController).singleton()
});

export default container;