import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ProveedoresController } from './models/proveedores/proveedores.controller';
import { MensajesModule } from './models/mensajes/mensajes.module';
import { ProveedoresModule } from './models/proveedores/proveedores.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MensajesModule,
    ProveedoresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

