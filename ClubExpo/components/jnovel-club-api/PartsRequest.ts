import IPaged from "./Pagination";

export interface PartsRequest extends IPaged {
    parts: Part[]
}