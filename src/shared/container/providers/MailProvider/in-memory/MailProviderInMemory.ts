import IMailProvider from '../IMailPrivider';

class MailProviderInMemory implements IMailProvider {
    private emails: any[];

    public async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string,
    ): Promise<void> {
        this.emails.push({
            to,
            subject,
            variables,
            path,
        });
    }
}

export default MailProviderInMemory;
