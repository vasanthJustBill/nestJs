// Import necessary modules and dependencies
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service'; // Import UserService

@Controller('users') // Define the base route for this controller
export class UserController {
  constructor(
    private userService: UserService, // Inject the UserService
  ) {}

  /**
   * Handles HTTP GET requests to retrieve all users.
   * @returns {Promise<User[]>} A Promise that resolves to an array of user objects.
   */
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  /**
   * Handles HTTP POST requests to create a new user.
   * @param {any} data - The user data to be created.
   * @returns {Promise<User>} A Promise that resolves to the created user object or an error response.
   */
  @Post()
  async create(@Body() data: any) {
    const user = await this.userService.createData(data);

    return { user }; // Return the created user if successful
  }

  /**
   * Handles HTTP GET requests to retrieve a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A Promise that resolves to the retrieved user or an error response.
   */
  @Get(':id') // Define a route parameter for the user ID
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    return { user }; // Return the retrieved user if found
  }

  /**
   * Handles HTTP PATCH requests to update an existing user.
   * @param {string} id - The ID of the user to be updated.
   * @param {any} data - The updated user data.
   * @returns {Promise<User>} A Promise that resolves to the updated user object or an error response.
   */
  @Patch(':id') // Define a route parameter for the user ID
  async update(@Param('id') id: string, @Body() data: any) {
    const user = await this.userService.update(id, data);

    return { user }; // Return the updated user if successful
  }

  /**
   * Handles HTTP DELETE requests to delete an existing user.
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A Promise that resolves to a successful deletion or an error response.
   */
  @Delete(':id') // Define a route parameter for the user ID
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);

    // Return a success message or status code (e.g., HTTP 204 No Content)
    return;
  }
}
