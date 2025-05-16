import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS
  app.enableCors({
    origin: '*', // Ou true para permitir qualquer origem (apenas em desenvolvimento)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Se estiver usando cookies/sessão
  });

  await app.listen(3000);
}
bootstrap();
