import { S3 } from 'aws-sdk';
import fs from 'fs';
import { resolve } from 'path';
import mime from 'mime';
import upload from '@config/updload';
import IStorageProvider from '../IStorageProvider';

class S3StorageProvider implements IStorageProvider {
    private cliente: S3;

    constructor() {
        this.cliente = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }

    public async save(file: string, folder: string): Promise<string> {
        const fileTempDir = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(fileTempDir);

        const ContentType = mime.getType(fileTempDir);

        await this.cliente
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(fileTempDir);

        return file;
    }

    public async delete(file: string, folder: string): Promise<void> {
        await this.cliente
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
            })
            .promise();
    }
}

export default S3StorageProvider;
