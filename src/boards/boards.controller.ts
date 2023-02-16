import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, UseGuards, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
 

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }


  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User ): Promise<Board> {
      this.logger.verbose(`User ${user.username} creating a new board.
      Payload: ${JSON.stringify(createBoardDto)}`)
    return this.boardsService.createBoard(createBoardDto, user);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto) : Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }


  // @Get()
  // getAllTask(): Promise<Board[]>{
  //   return this.boardsService.getAllBoards();
  // }

  @Get()
  getAllBoard(
      @GetUser() user: User
  ): Promise<Board[]> {
      this.logger.verbose(`User ${user.username} trying to get all boards`);
      return this.boardsService.getAllBoards(user);
  }

  
  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
      return this.boardsService.getBoardById(id);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id)
  // }


  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) 
  id,
  @GetUser() user:User
  ): Promise<void> {
      return this.boardsService.deleteBoard(id, user);
  }



  // @Delete('/:id')
  // deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   const result = this.boardsService.deleteBoard(id);

  //   // if(result.affected === 0){
  //   //   throw new NotFoundException(`Can't find Board with id ${id}`)
  //   // }

  //   return result;
  // }
 

  // @Delete('/:id')
  // deleteBoard(@Param('id') id:string ): void {
  //   this.boardsService.deleteBoard(id);
  // }
  


  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status)
  }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

}
