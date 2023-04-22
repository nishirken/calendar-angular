import { Dayjs } from 'dayjs';
import { Observer as RxObserver } from 'rxjs';

export type ObserverWithError<T, E> = Omit<RxObserver<T>, 'error'> & {
  error: (err: E) => void;
};

export type Interval<T> = { start: T; end: T };
export type DayjsInterval = Interval<Dayjs>;
export type DateInterval = Interval<Date>;
