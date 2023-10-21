import IPaged from "./Pagination";

export interface VolumesRequest extends IPaged {
    volumes: Volume[]
}