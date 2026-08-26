import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot';
import { UpdateSpotDto } from './dto/update-spot';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly SpotRepository: Repository<Spot>,
  ) {}

  findAll(): Promise<Spot[]> {
    return this.SpotRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Spot> {
    const Spot = await this.SpotRepository.findOneBy({ id });
    if (!Spot) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    return Spot;
  }

  create(dto: CreateSpotDto): Promise<Spot> {
    const Spot = this.SpotRepository.create({
      ...dto,
      name: dto.name,
      active: true,
    });
    return this.SpotRepository.save(Spot);
  }

  async update(id: string, dto: UpdateSpotDto): Promise<Spot> {
    const Spot = await this.findOne(id);

    if (dto.name !== undefined) {
      Spot.name = dto.name;
    }

    if (dto.active !== undefined) {
      Spot.active = dto.active;
    }

    return this.SpotRepository.save(Spot);
  }

  async remove(id: string): Promise<void> {
    const Spot = await this.findOne(id);
    await this.SpotRepository.remove(Spot);
  }
}
