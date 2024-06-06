import { IDeleteOptions } from './IDeleteOptions';
import { IUploadOptions } from './IUploadOptions';
import { IUploadResult } from './IUploadResult';

export interface IS3Client {
  delete(options: IDeleteOptions): Promise<void>;
  upload(options: IUploadOptions): Promise<IUploadResult>;
}
