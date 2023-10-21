import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, } from './Themed';
import Repository from "./jnovel-club-api/Repository";

export default function VolumeTitle() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [volume, setVolume] = useState<Volume>();

  const getVolume = async () => {
    setVolume(await Repository.getVolume(id));
  };

  useEffect(() => {
    getVolume();
  }, [id]);

  return (<Text>{volume?.title}</Text>)
}