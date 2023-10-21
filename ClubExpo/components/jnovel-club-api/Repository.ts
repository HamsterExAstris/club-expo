import AsyncStorage from '@react-native-async-storage/async-storage';
import { PartsRequest } from './PartsRequest';
import { SeriesRequest } from './SeriesRequest';
import { VolumesRequest } from './VolumesRequest';

async function get<T>(token: string | null | undefined, type: string, id: string | null = null, subtype: string | null = null, skip: number | null = null, skipCache: boolean = false) {
    var result: T | undefined = undefined;
    try {
        let key = type;
        if (subtype) {
            key += `-${subtype}`;
        }
        if (id) {
            key += `-${id}`;
        }
        if (!skipCache) {
            const stored = await AsyncStorage.getItem(key);
            if (stored) {
                result = JSON.parse(stored);
            }
        }
        if (!result) {
            let url = `https://labs.j-novel.club/app/v1/${type}`;
            if (id) {
                url += `/${id}`;
            }
            if (subtype) {
                url += `/${subtype}`;
            }
            url += "?format=json";
            if (skip) {
                url += `&skip=${skip}`
            }

            const headers = new Headers();
            if (token) {
                headers.append("Authorization", `Bearer ${token}`); 
            }

            const response = await fetch(url, {
                headers: headers
            });
            result = await response.json();
            if (result && !skipCache) {
                await AsyncStorage.setItem(key, JSON.stringify(result));
            }
        }
    } catch (error) {
        console.error(error);
    }
    return result;
}

async function getIfId<T>(token: string | null | undefined, type: string, id: string | null = null, subtype: string | null = null, skip: number | null = null, skipCache: boolean = false) {
    var result: T | undefined = undefined;
    if (id) {
        result = await get<T>(token, type, id, subtype, skip, skipCache);
    }
    return result;
}

class Repository {
    public static getAllSeries = async (token: string | null | undefined) => {
        let result: Series[] = new Array(0);
        let request = await get<SeriesRequest>(token, "series", null, null, null, true);
        while (request && !request.pagination.lastPage) {
            result = result.concat(request.series);
            request = await get<SeriesRequest>(token, "series", null, null, request.pagination.limit + request.pagination.skip, true);
        }
        if (request) {
            result = result.concat(request.series);
        }
        await AsyncStorage.multiSet(result.map((s) => [`series-${s.slug}`, JSON.stringify(s)]));
        return result;
    };

    public static getSeries = async (token: string | null | undefined, id: string) => {
        return await getIfId<Series>(token, "series", id);
    };

    public static getVolumes = async (token: string | null | undefined, id: string) => {
        let result: Volume[] = new Array(0);
        if (id) {
            let request = await get<VolumesRequest>(token, "series", id, "volumes");
            while (request && !request.pagination.lastPage) {
                result = result.concat(request.volumes);
                request = await get<VolumesRequest>(token, "series", id, "volumes", request.pagination.limit + request.pagination.skip);
            }
            if (request) {
                result = result.concat(request.volumes);
            }
        }
        await AsyncStorage.multiSet(result.map((v) => [`volumes-${v.slug}`, JSON.stringify(v)]));
        return result;
    };

    public static getVolume = async (token: string | null | undefined, id: string) => {
        return await getIfId<Volume>(token, "volumes", id);
    };

    public static getVolumeParts = async (token: string | null | undefined, id: string) => {
        let result: Part[] = new Array(0);
        if (id) {
            let request = await get<PartsRequest>(token, "volumes", id, "parts");
            while (request && !request.pagination.lastPage) {
                result = result.concat(request.parts);
                request = await get<PartsRequest>(token, "volumes", id, "parts", request.pagination.limit + request.pagination.skip);
            }
            if (request) {
                result = result.concat(request.parts);
            }
        }
        await AsyncStorage.multiSet(result.map((p) => [`parts-${p.slug}`, JSON.stringify(p)]));
        return result;
    };

    public static getPart = async (token: string | null | undefined, id: string) => {
        const result = await getIfId<Part>(token, "parts", id);
        return (result && (!result.expiration || result.expiration > new Date()))
            ? result
            : undefined;
    }

    public static getPartData = async (token: string | null | undefined, id: string) => {
        // Check to make sure this part isn't expired.
        const parentPart = await this.getPart(token, id);
        return parentPart
            ? await getIfId<PartData>(token, "parts", id, "data")
            : undefined;
    }

    public static login = async (username: string, password: string) => {
        const response = await fetch('https://labs.j-novel.club/app/v1/auth/login?format=json', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                login: username,
                password: password,
                slim: true
            })
        });
        const login : LoginResponse = await response.json();
        return login?.id;
    }
}

export default Repository;