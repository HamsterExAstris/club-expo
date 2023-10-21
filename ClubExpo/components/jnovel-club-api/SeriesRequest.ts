import IPaged from "./Pagination";

export interface SeriesRequest extends IPaged {
    series: Series[]
}