import {Page} from "./Page.ts";
import {Company} from "./Company.ts";

export interface UploadedData {
    pages?: Page[];
    companies?: Company[];
}