import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';
import { useSession } from "./ctx";
import Repository from "./jnovel-club-api/Repository";

export default function SeriesTitle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [series, setSeries] = useState<Series>();
  const session = useSession();

  const getSeries = async () => {
    setSeries(await Repository.getSeries(session?.session, id));
  };

  useEffect(() => {
    getSeries();
  }, [id]);

  return (<Text>{series?.title}</Text>)
}