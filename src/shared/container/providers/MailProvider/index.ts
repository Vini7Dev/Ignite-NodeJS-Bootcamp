import { container } from 'tsyringe';
import IMailProvider from './IMailPrivider';
import EtherialMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SesMailProvider';

const mailProvider = {
    ethereal: container.resolve(EtherialMailProvider),
    ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    mailProvider[process.env.MAIL_PROVIDER],
);
