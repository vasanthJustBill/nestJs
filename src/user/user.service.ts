// Import necessary modules and dependencies
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable() // Decorator marks this class as injectable
export class UserService {
  constructor(
    private readonly prisma: PrismaService, // Inject PrismaService
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} A Promise that resolves to an array of user objects.
   */
  async findAll() {
    return this.prisma.user.findMany();
  }

  /**
   * Creates a new user in the database.
   * @param {any} data - The user data to be created.
   * @returns {Promise<User>} A Promise that resolves to the created user object.
   */
  async createData(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  /**
   * Updates an existing user in the database.
   * @param {string} id - The ID of the user to be updated.
   * @param {any} data - The updated user data.
   * @returns {Promise<User>} A Promise that resolves to the updated user object.
   */
  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a user from the database.
   * @param {string} id - The ID of the user to be deleted.
   * @returns {Promise<User>} A Promise that resolves to the deleted user object.
   */
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * Retrieves a user by ID from the database.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User | null>} A Promise that resolves to the retrieved user or null if not found.
   */
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
