import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: NestExpressApplication) {
  const swaggerPath = '/api/swagger';
  const isDev = process.env.NODE_ENV !== 'production';

  const options = new DocumentBuilder()
    .setTitle('Simple server')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (isDev) {
    SwaggerModule.setup(swaggerPath, app, document);
  }
}
