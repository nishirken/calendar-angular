export type ApiError<T extends string, S extends Record<string, any> = never> = {
    statusCode: number;
    error: {
        code: T;
        data: S;
    };
};