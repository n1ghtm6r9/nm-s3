declare module '@nmxjs/config' {
  interface IConfig {
    s3: {
      accessKey: string;
      secretKey: string;
      endpoint: string;
      bucket: string;
      forcePathStyle?: boolean;
    };
  }
  const configKey: string;
}
