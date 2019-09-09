import { Controller, Get, Put, Post, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { create } from 'domain';
import CreateTodoDto from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './interface/todo.interface';
import { JoiValidationPipe } from './JoiValidationPipe';
import { CreateTodoSchema } from './validation/createTodo.schema';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Todo> {
        return this.todoService.findOne(id);
    }

    @Post()
    @UsePipes(new JoiValidationPipe(CreateTodoSchema))
    create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoService.create(createTodoDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Todo> {
        return this.todoService.delete(id);
    }

    @Put(':id')
    update(@Body() updateTodoDto: CreateTodoDto, @Param('id') id) {
        return this.todoService.update(id, updateTodoDto);
    }
}
