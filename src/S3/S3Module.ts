import { S3, Endpoint } from 'aws-sdk';
import { Global, Module } from '@nestjs/common';
import { s3ClientKey } from './constants';
import { IS3Client } from './interfaces';
import { configKey, IConfig } from '@nmxjs/config';

@Global()
@Module({
  providers: [
    {
      provide: s3ClientKey,
      useFactory: (config: IConfig): IS3Client => {
        if (process.env.NODE_ENV === 'test') {
          return {
            upload: async () => ({
              url: 'test',
            }),
            delete: async () => undefined,
          };
        }

        const s3 = new S3({
          endpoint: new Endpoint(config.s3.endpoint),
          credentials: {
            accessKeyId: config.s3.accessKey,
            secretAccessKey: config.s3.secretKey,
          },
          s3ForcePathStyle: config.s3.forcePathStyle,
        });

        return {
          upload: options =>
            new Promise((resolve, reject) =>
              s3.upload(
                {
                  Bucket: config.s3.bucket,
                  Key: options.key,
                  Body: options.body,
                  ACL: options.acl || 'public-read',
                  ContentType: options.contentType,
                },
                (e, d) => (e ? reject(e) : resolve({ url: d.Location })),
              ),
            ),
          delete: options =>
            new Promise((resolve, reject) =>
              s3.deleteObject(
                {
                  Bucket: config.s3.bucket,
                  Key: options.key,
                },
                e => (e ? reject(e) : resolve()),
              ),
            ),
        };
      },
      inject: [configKey],
    },
  ],
  exports: [s3ClientKey],
})
export class S3Module {}
