import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book, IBook } from './book.schema';
import { NotFoundException } from '@nestjs/common';

const mockBook = {
  _id: 'someBookId',
  title: 'Test Book',
  author: 'Test Author',
};

const mockBookModel = {
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockBook]),
  }),
  create: jest.fn().mockResolvedValue(mockBook),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockBook),
  }),
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<IBook>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('Book'),
          useValue: mockBookModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<IBook>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(await service.findAll()).toEqual([mockBook]);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      expect(await service.create({ title: 'Test Book', author: 'Test Author' })).toEqual(mockBook);
    });
  });

  describe('update', () => {
    it('should update a book by ID', async () => {
      expect(await service.update('someBookId', { title: 'Updated Title' })).toEqual(mockBook);
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      await expect(service.update('invalid_id', { title: 'New Title' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a book by ID', async () => {
      expect(await service.delete('someBookId')).toEqual(mockBook);
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      await expect(service.delete('invalid_id')).rejects.toThrow(NotFoundException);
    });
  });
});
