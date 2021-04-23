import { container } from 'tsyringe';
import IDateProvider from './DateProvider/IDateProvider';
import DayJsProvider from './DateProvider/implementations/DayjsProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayJsProvider);
