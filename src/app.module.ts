// Import necessary modules and dependencies
import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'; // Import PrismaModule
import { UserModule } from './user/user.module';

@Module({
  // Import the PrismaModule and configure it as global
  imports: [
    PrismaModule.forRoot({
      isGlobal: true, // Make PrismaModule available globally
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} // Define the AppModule class
