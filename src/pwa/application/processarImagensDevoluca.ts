import { File } from '@nest-lab/fastify-multer';
import { Injectable } from '@nestjs/common';
import { minioClient } from '../infra/minio/minio';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SalvarImagensBancoZodDto } from '../dtos/salvarImagensBanco.dto';

@Injectable()
export class ProcessarImagensDevolucaoUsecase {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  async execute(demandaId: string, files: File[]): Promise<void> {
    const listString: SalvarImagensBancoZodDto[] = [];
    //await minioClient.makeBucket('demanda', 'us-east-1');
    await Promise.all(
      files.map(async (file) => {
        const split = file.originalname.split('-');
        const response = await minioClient.putObject(
          'demanda',
          file.originalname,
          file.buffer || '',
        );
        listString.push({
          demandaId,
          processo: split[1],
          tag: response.etag,
        });
      }),
    );
    this.eventEmitter.emit('salvarImagensBanco', listString);
    return Promise.resolve();
  }
}
