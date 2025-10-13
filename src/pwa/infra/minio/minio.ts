import * as Minio from 'minio';

export const minioClient = new Minio.Client({
  endPoint: 'minio.lilog.app',
  accessKey: 'admin',
  secretKey: 'Murilo@2024jose',
});
