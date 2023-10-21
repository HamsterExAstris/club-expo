import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';

export default function PartTitle() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [part, setPart] = useState<Part>();

    const getPart = async () => {
        if (id) {
            try {
                const response = await fetch(`https://labs.j-novel.club/app/v1/parts/${id}?format=json`);
                const json = await response.json();
                setPart(json);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        getPart();
    }, [id]);

    return (<Text>{part?.title}</Text>)
}