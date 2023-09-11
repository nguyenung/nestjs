import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { User, UserSchema, UserSchemaFactory } from './entities/user.entity';
import {
  FlashCard,
  FlashCardSchema,
} from '@module/flash-cards/entities/flash-card.entity';
import {
  Collection,
  CollectionSchema,
} from '@module/collections/entities/collection.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
        inject: [getModelToken(FlashCard.name), getModelToken(Collection.name)],
        imports: [
          MongooseModule.forFeature([
            { name: FlashCard.name, schema: FlashCardSchema },
            { name: Collection.name, schema: CollectionSchema },
          ]),
        ],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
