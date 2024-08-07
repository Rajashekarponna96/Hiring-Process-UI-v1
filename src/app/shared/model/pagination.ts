

export interface Pagination{
    content?: any[];
    pageable:any;
    totalElements: number; 
    totalPages: number;
    size: number;
    first:boolean, 
    last: boolean,
    number:number
}