import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // @Get('/')
  // getAllBoard(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }


  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto) : Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }


  @Get()
  getAllTask(): Promise<Board[]>{
    return this.boardsService.getAllBoards();
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
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = this.boardsService.deleteBoard(id);

    // if(result.affected === 0){
    //   throw new NotFoundException(`Can't find Board with id ${id}`)
    // }

    return result;
  }
 

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
