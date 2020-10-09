
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensaje } from './entities/mensaje.entity';

import { MensajesController } from './mensajes.controller';
import { MensajesService } from './mensajes.service';

@Module({
  exports:[TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Mensaje])],
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class MensajesModule {}