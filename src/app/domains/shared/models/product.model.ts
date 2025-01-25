import { Category } from "./category.model";

export interface Product{
    id:number;
    title: string;
    description:string;
    price: number;
    images:string[];
    creationAt:string;
    brand:string;
    category: Category;
    
}