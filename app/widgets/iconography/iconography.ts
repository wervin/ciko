import { ImageSourcePropType } from "react-native";

export type Iconography = {
    id: string;
    title: string;
    subtitles: string[];
    description: string;
    criteria: string[],
    images: ImageSourcePropType[];
    alternatives: Iconography[];
};