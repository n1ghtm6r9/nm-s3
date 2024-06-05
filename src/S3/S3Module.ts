import { S3, Endpoint } from 'aws-sdk';
import { Module } from '@nestjs/common';
import { s3Key } from './constants';
import { IS3Client } from './interfaces';
import { configKey, IConfig } from '@nmxjs/config';

@Module({
  providers: [
    {
      provide: s3Key,
      useFactory: (config: IConfig): IS3Client =>
        new S3({
          endpoint: new Endpoint(config.s3.endpoint),
          credentials: {
            accessKeyId: config.s3.accessKey,
            secretAccessKey: config.s3.secretKey,
          },
        }),
      inject: [configKey],
    },
  ],
  exports: [s3Key],
})
export class S3Module {}
