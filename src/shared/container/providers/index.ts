import { container } from 'tsyringe';
import IDateProvider from './DateProvider/IDateProvider';
import DayJsProvider from './DateProvider/implementations/DayjsProvider';
import IMailProvider from './MailProvider/IMailPrivider';
import EtherialMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherialMailProvider(),
);
