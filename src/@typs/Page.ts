import {Industry} from "./Industry.ts";

export interface Page {
    pageSn: number;
    pageJsonUrl: string;
    name: string;
    companyName: string;
    Industry: Industry[];
}