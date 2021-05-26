import { resolve } from 'path';
import fs from 'fs';
import upload from '@config/upload';
import IStorageProvider from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    public async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tempFolder, file),
            resolve(`${upload.tempFolder}/${folder}`, file),
        );

        return file;
    }

    public async delete(file: string, folder: string): Promise<void> {
        const fileDirectory = resolve(`${upload.tempFolder}/${folder}`, file);

        try {
            await fs.promises.stat(fileDirectory);
        } catch {
            return;
        }

        await fs.promises.unlink(fileDirectory);
    }
}

export default LocalStorageProvider;
