import {Page} from "./Page.ts";
import {Company} from "./Company.ts";
import {Industry} from "./Industry.ts";

export interface UploadedData {
    pages?: Page[];
    companies?: Company[];
    industries?: Industry[];
}