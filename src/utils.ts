import { DateInterval, DayjsInterval } from './types';

export const toDateInterval = ({
  start,
  end,
}: DayjsInterval): DateInterval => ({
  start: start.toDate(),
  end: end.toDate(),
});
