// Import necessary modules and dependencies
import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma'; // Import PrismaModule
import { UserModule } from './user/user.module';

@Module({
  // Import the PrismaModule and configure it as global
  imports: [
    PrismaModule.forRoot({
      isGlobal: true, // Make PrismaModule available globally
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} // Define the AppModule class
