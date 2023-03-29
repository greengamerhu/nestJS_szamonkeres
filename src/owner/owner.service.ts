import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(private dataSource : DataSource) {

  }


  async create(createOwnerDto: CreateOwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner)
    const newOwner = new Owner()
    newOwner.fullName = createOwnerDto.fullName
    newOwner.business = createOwnerDto.business
    await ownerRepo.save(newOwner)
  }

  async findAll() {
    return await  this.dataSource.getRepository(Owner).find()

  }

   findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  async  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner)
    const ownerToUpdate = await ownerRepo.findOneBy({id})

    if(!ownerToUpdate) {
      throw new BadRequestException("Ilyen id-val nem található Tulajdonos")
    }
    if(updateOwnerDto.fullName == null && updateOwnerDto.business == null) {
      throw new BadRequestException("A kéréshez nem társult semilyen adat")
    }
    ownerToUpdate.fullName = updateOwnerDto.fullName
    ownerToUpdate.business = updateOwnerDto.business

    ownerRepo.save(ownerToUpdate)
  }

  async remove(id: number) {
    const ownerRepo = this.dataSource.getRepository(Owner)
    const ownerToDelete = await ownerRepo.findOneBy({id})
    if(ownerToDelete == null) {
      throw new BadRequestException()
    }
    return await ownerRepo.delete({id: id}) 

  }
}
