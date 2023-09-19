// Import necessary modules and dependencies
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Create an asynchronous function for bootstrapping the application
async function bootstrap() {
  // Create an instance of the NestJS application using AppModule
  const app = await NestFactory.create(AppModule);

  // Start the application and listen on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();
