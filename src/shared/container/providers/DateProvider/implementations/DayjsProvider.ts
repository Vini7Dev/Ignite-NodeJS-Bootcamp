import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import IDateProvider from '../IDateProvider';

dayjs.extend(utc);

class DayJsProvider implements IDateProvider {
    public compareInHours(startDate: Date, endDate: Date): number {
        const startDateUTC = this.convertToUTC(startDate);
        const endDateUTC = this.convertToUTC(endDate);

        return dayjs(endDateUTC).diff(startDateUTC, 'hours');
    }

    public compareInDays(startDate: Date, endDate: Date): number {
        const startDateUTC = this.convertToUTC(startDate);
        const endDateUTC = this.convertToUTC(endDate);

        return dayjs(endDateUTC).diff(startDateUTC, 'days');
    }

    public convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    public dateNow(): Date {
        return dayjs().toDate();
    }

    public addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    }
}

export default DayJsProvider;
