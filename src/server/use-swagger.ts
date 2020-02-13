import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: NestExpressApplication) {
  const apiPath = '/api';
  const isDev = process.env.NODE_ENV !== 'production';

  const options = new DocumentBuilder()
    .setTitle('Nest rest api')
    .setDescription('Test API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (isDev) {
    SwaggerModule.setup(apiPath, app, document);
  }
}
