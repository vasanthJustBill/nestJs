// Import necessary modules and dependencies
import { Module } from '@nestjs/common';
import { UserController } from './user.controller'; // Import UserController
import { UserService } from './user.service'; // Import UserService

@Module({
  controllers: [UserController],  // Declare UserController as a controller in this module
  providers: [UserService],       // Declare UserService as a provider in this module
})
export class UserModule {} // Define the UserModule class
