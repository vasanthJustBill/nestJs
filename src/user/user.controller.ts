// Import necessary modules and dependencies
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
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
    try {
      // Attempt to create the user
      const user = await this.userService.createData(data);
      return user; // Return the created user if successful
    } catch (error) {
      if (error.code === 'P2002' && error.meta && error.meta.target) {
        // Handle the case where a unique constraint violation occurs (attribute already exists)
        const attribute = error.meta.target;
        throw new HttpException(
          `A user with the same ${attribute} already exists.`,
          HttpStatus.CONFLICT,
        );
      } else {
        // Handle other errors
        throw new HttpException(
          'An error occurred while creating the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Handles HTTP GET requests to retrieve a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} A Promise that resolves to the retrieved user or an error response.
   */
  @Get(':id') // Define a route parameter for the user ID
  async findOne(@Param('id') id: string) {
    try {
      // Attempt to retrieve the user by ID
      const user = await this.userService.findOne(id);
      if (!user) {
        throw { code: 'P2025' };
      }

      return user; // Return the retrieved user if found
    } catch (error) {
      if (error.code === 'P2025') {
        // Handle the case where the user with the provided ID doesn't exist
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        // Handle other errors
        throw new HttpException(
          'An error occurred while retrieving the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Handles HTTP PATCH requests to update an existing user.
   * @param {string} id - The ID of the user to be updated.
   * @param {any} data - The updated user data.
   * @returns {Promise<User>} A Promise that resolves to the updated user object or an error response.
   */
  @Patch(':id') // Define a route parameter for the user ID
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      // Attempt to update the user
      const updatedUser = await this.userService.update(id, data);

      return updatedUser; // Return the updated user if successful
    } catch (error) {
      if (error.code === 'P2025') {
        // Handle the case where the user with the provided ID doesn't exist
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        // Handle other errors
        throw new HttpException(
          'An error occurred while updating the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Handles HTTP DELETE requests to delete an existing user.
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<void>} A Promise that resolves to a successful deletion or an error response.
   */
  @Delete(':id') // Define a route parameter for the user ID
  async delete(@Param('id') id: string) {
    try {
      // Attempt to delete the user
      const deletedUser = await this.userService.delete(id);

      // Return a success message or status code (e.g., HTTP 204 No Content)
      return;
    } catch (error) {
      if (error.code === 'P2025') {
        // Handle the case where the user with the provided ID doesn't exist
        throw new HttpException(
          `User with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        // Handle other errors
        throw new HttpException(
          'An error occurred while deleting the user.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
