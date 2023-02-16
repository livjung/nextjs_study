

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), //
    BoardsModule, AuthModule,
  ],
})
export class AppModule {}


// import { Module } from '@nestjs/common'; 
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BoardsController } from './boards/boards.controller';
// import { BoardsModule } from './boards/boards.module';
// import { BoardsService } from './boards/boards.service';
// import { BoardRepository } from './boards/board.repository';

// import { typeORMConfig } from './configs/typeorm.config';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(typeORMConfig),
//     BoardsModule
//   ],
//   controllers: [BoardsController],
//   providers: [BoardsService, BoardRepository],
// })
// export class AppModule {}