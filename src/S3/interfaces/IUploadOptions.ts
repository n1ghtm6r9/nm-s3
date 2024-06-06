import type { ObjectCannedACL, Body } from 'aws-sdk/clients/s3';

export interface IUploadOptions {
  key: string;
  contentType: string;
  body: Body;
  acl?: ObjectCannedACL;
}
