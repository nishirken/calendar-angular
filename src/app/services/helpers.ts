import { environment } from "../../environments/environment";

export const {apiOrigin} = environment;
export const url = (path: string): string => `${apiOrigin}/${path.replace(/^\//, '')}`;
