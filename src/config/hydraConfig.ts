import Hydra from 'hydra';

// Configuración de Hydra para el microservicio 

const hydraConfig = {
  hydra: {
    // nombre del micro-servicio. Es importante para identificar el servicio en la red de microservicio
    serviceName: 'auth-service',
    serviceIP: '',
    servicePort: parseInt(process.env.PORT || '4000', 10),
    serviceType: 'express',
    serviceDescription: 'Authentication service',
    // Configuración de Redis, usada por hydra para el manejo de mensajes y servicios
    redis: {
      url: process.env.REDIS_URL,
      db: 15
    }

  }
}

// Inicializar Hydra
const initHydra = async() => {
  try {
    await Hydra.init(hydraConfig);

    // Registramos el servicio en Hydra, Esto lo añade al ecosistema de microservicios
    await Hydra.registerService();

  } catch (error) {
    console.error('Error initializing Hydra', error);
    process.exit(1);
  }
}

export default initHydra;