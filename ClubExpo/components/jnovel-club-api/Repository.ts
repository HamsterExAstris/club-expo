import AsyncStorage from '@react-native-async-storage/async-storage';

async function get<T>(id: string, type: string) {
    var result: T | undefined = undefined;
    if (id) {
        try {
            const key = `${type}-${id}`;
            const stored = await AsyncStorage.getItem(key);
            if (stored) {
                result = JSON.parse(stored);
            }
            else {
                const response = await fetch(`https://labs.j-novel.club/app/v1/${type}/${id}?format=json`);
                result = await response.json();
                if (result)
                {
                    await AsyncStorage.setItem(key, JSON.stringify(result));
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return result;
}

class Repository {
    public static getSeries = async (id: string) => {
        return await get<Series>(id, "series");
    };

    public static getVolume = async (id: string) => {
        return await get<Volume>(id, "volumes");
    };

    public static getPart = async (id: string) => {
        return await get<Part>(id, "parts");
    }
}

export default Repository;