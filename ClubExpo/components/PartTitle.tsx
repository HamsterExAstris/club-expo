import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';
import { useSession } from "./ctx";
import Repository from "./jnovel-club-api/Repository";

export default function PartTitle() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [part, setPart] = useState<Part>();
    const session = useSession();

    const getPart = async () => {
        setPart(await Repository.getPart(session?.session, id));
    };

    useEffect(() => {
        getPart();
    }, [id]);

    return (<Text>{part?.title}</Text>)
}