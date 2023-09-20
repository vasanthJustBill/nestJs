// Import necessary modules and dependencies
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { env } from 'process';

// Create an asynchronous function for bootstrapping the application
async function bootstrap() {
  // Create an instance of the NestJS application using AppModule
  const app = await NestFactory.create(AppModule);

  // Retrieve the HTTP adapter from the app
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Use the PrismaClientExceptionFilter as a global filter
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Start the application and listen on port
  const PORT = env.PORT || 3000;
  await app.listen(PORT);
}

// Call the bootstrap function to start the application
bootstrap();
