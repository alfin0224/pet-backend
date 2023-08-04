import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) 
        private petsRepository: Repository<Pet>,
        private ownerService: OwnersService,
        ){}

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find();
    }

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(createPetInput);

        return this.petsRepository.save(newPet);
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneByOrFail({id});
      }
    
    //   async remove(id: string): Promise<void> {
    //     const user = await this.findOne(id);
    //     await user.destroy();
    //   }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownerService.findOne(ownerId)
    }
}
