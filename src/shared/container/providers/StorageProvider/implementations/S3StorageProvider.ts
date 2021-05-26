import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import fs from 'fs';
import mime from 'mime';

import upload from '@config/upload';
import IStorageProvider from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    public async save(file: string, folder: string): Promise<string> {
        const fileTempDirectory = resolve(upload.tempFolder, file);

        const fileContent = await fs.promises.readFile(fileTempDirectory);

        const contentType = mime.getType(fileTempDirectory);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
            .promise();

        await fs.promises.unlink(fileTempDirectory);

        return file;
    }

    public async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }
}

export default S3StorageProvider;
