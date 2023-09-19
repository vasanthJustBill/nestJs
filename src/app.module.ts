import { Module } from '@nestjs/common';
import { PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot()],
  controllers: [],
  providers: [
    // register filter here or in main.ts
    // {
    //   provide: APP_FILTER,
    //   useFactory: ({ httpAdapter }: HttpAdapterHost) => {
    //     return new PrismaClientExceptionFilter(httpAdapter);
    //   },
    //   inject: [HttpAdapterHost],
    // },
    // or
    providePrismaClientExceptionFilter()
  ],
})
export class AppModule {}
