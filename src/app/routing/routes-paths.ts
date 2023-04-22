import { format } from 'date-fns';

export enum RoutePath {
  Signin = 'auth/signin',
  Signup = 'auth/signup',
  Week = 'week',
}

export const routePaths = {
  week: (date: Date = new Date()) =>
    `${RoutePath.Week}/${format(date, 'yyyy/MM/dd')}`,
} as const;
