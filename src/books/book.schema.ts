import { Schema, Document } from 'mongoose';
import { Prop, SchemaFactory, Schema as MongooseSchema } from '@nestjs/mongoose';

@MongooseSchema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// Define a separate interface for the document
export interface IBook extends Document {
  title: string;
  author: string;
}