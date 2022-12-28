import {Observer as RxObserver} from 'rxjs';

export type ObserverWithError<T, E> = Omit<RxObserver<T>, 'error'> & {
    error: (err: E) => void;
};