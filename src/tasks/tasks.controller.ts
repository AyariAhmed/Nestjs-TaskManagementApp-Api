import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
   UseGuards, Logger
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

   @Get()
  getTasks(
    @GetUser() user : User,
    @Query(ValidationPipe) filterDto: GetTasksFilterDto) : Promise<Task[]> {
      this.logger.verbose(`User '${user.username}' retrieving all tasks !.Filters ${JSON.stringify(filterDto)}`)
   return this.tasksService.getTasks(filterDto,user);
  }

  @Get(':id')
  getTaskById(
    @GetUser() user : User,
    @Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id,user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user : User
    ): Promise<Task> {
      this.logger.verbose(`User '${user.username}' is creating a New Task . Data : ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createTask(createTaskDto,user);
  }

  @Delete(':id')
  deleteTask(
    @GetUser() user : User,
    @Param('id', ParseIntPipe) id: number): Promise<number> {
    return this.tasksService.deleteTask(id,user);
  }

  @Patch('/:id/status')
  patchTask(
    @GetUser() user : User,
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status,user);
  }
}
