import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';

export default function VolumeTitle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [volume, setVolume] = useState<Volume>();

  const getPart = async () => {
    if (id) {
      try {
        const response = await fetch(`https://labs.j-novel.club/app/v1/volumes/${id}?format=json`);
        const json = await response.json();
        setVolume(json);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPart();
  }, [id]);

  return (<Text>{volume?.title}</Text>)
}