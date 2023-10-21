import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';
import Repository from "./jnovel-club-api/Repository";

export default function SeriesTitle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [series, setSeries] = useState<Series>();

  const getSeries = async () => {
    setSeries(await Repository.getSeries(id));
  };

  useEffect(() => {
    getSeries();
  }, [id]);

  return (<Text>{series?.title}</Text>)
}