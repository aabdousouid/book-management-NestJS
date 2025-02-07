import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook } from './book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<IBook[]> {
    return this.booksService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<IBook> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id:string,@Body() updateBookDto:UpdateBookDto){
    return this.booksService.update(id, updateBookDto); 
  }
  
  @Delete(':id') // Delete a book by ID
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }

}