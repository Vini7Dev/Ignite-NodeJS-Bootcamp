import fs from 'fs';
import { resolve } from 'path';
import upload from '@config/updload';
import IStorageProvider from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
    public async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder),
            resolve(`${upload.tmpFolder}/${folder}`, file),
        );

        return file;
    }

    public async delete(file: string, folder: string): Promise<void> {
        const fileDirName = resolve(`${upload.tmpFolder}/${folder}`, file);

        try {
            await fs.promises.stat(fileDirName);
        } catch {
            return;
        }

        await fs.promises.unlink(fileDirName);
    }
}

export default LocalStorageProvider;
