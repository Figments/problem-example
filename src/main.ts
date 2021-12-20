import { NestFactory } from '@nestjs/core';
import { VersioningType, Logger } from '@nestjs/common';
import { config, DotenvConfigOutput } from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import csurf from 'csurf';
import { AppModule } from './app.module';

/**
 * Determines the location of the required .env file.
 */
const results: DotenvConfigOutput = config();
if (results.error) {
  Logger.warn(
    `You don't have a .env file set up! Are you sure the environment variables are configured?`,
    `Main`,
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Initializing core functionality & security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  if (process.env.NODE_ENV === 'production') {
    app.use(csurf({ cookie: { sameSite: 'lax', secure: true } }));
    // this is to make sure the XSRF-TOKEN is being set correctly
    app.use(function (req: any, res: any, next: any) {
      res.cookie('XSRF-TOKEN', req.csrfToken(), {
        sameSite: 'lax',
        secure: true,
      });
      return next();
    });
  }
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `v1`,
  });
  await app.listen(3000);
}
bootstrap();
