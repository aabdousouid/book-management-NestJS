import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, IBook } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<IBook>) {}

  async findAll(): Promise<IBook[]> {
    return this.bookModel.find().exec();
  }

  async create(book: CreateBookDto): Promise<IBook> {
    return this.bookModel.create(book);
  }
  

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  async delete(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();

    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return deletedBook;
  }
}