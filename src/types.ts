import {Observer as RxObserver} from 'rxjs';

export type ObservableWithError<T, E> = Omit<

export type ObserverWithError<T, E> = Omit<RxObserver<T>, 'error'> & {
    error: (err: E) => void;
};