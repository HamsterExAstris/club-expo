import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';

export default function SeriesTitle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [series, setSeries] = useState<Series>();

  const getPart = async () => {
    if (id) {
      try {
        const response = await fetch(`https://labs.j-novel.club/app/v1/series/${id}?format=json`);
        const json = await response.json();
        setSeries(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPart();
  }, [id]);

  return (<Text>{series?.title}</Text>)
}