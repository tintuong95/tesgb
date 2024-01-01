import { Request } from 'express';
export declare function pagination(req: Request, data: any, currentPage: number, perPage: number): {
    meta: {
        currentPage: number;
        from: number;
        to: any;
        perPage: number;
        total: any;
        currentLink: string;
        previousLink: string;
        nextLink: string;
        lastPage: number;
    };
    data: any;
    links: any;
};
export declare function queryHandler(query: any): {
    skip: number;
    take: any;
    currentPage: number;
    perPage: number;
};
