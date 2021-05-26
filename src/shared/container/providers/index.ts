import { container } from 'tsyringe';
import IDateProvider from './DateProvider/IDateProvider';
import DayJsProvider from './DateProvider/implementations/DayjsProvider';
import IMailProvider from './MailProvider/IMailPrivider';
import EtherialMailProvider from './MailProvider/implementations/EtherealMailProvider';
import LocalStorageProvider from './StorageProvider/implementations/LocalStorageProvider';
import S3StorageProvider from './StorageProvider/implementations/S3StorageProvider';
import IStorageProvider from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherialMailProvider(),
);

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.DISK],
);
