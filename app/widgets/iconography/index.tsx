import { View, Text } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect } from "react";
import { IconographyWidget, IconographyWidgetData } from "../_widgets";
import { Iconography } from "./iconography";
import { randomUUID } from "expo-crypto";
import { TrimesterCard } from "./trimesterCard";

const firstTrimesterIconographyList: Iconography[] = [
    {
        id: randomUUID(),
        title: "Coupe Sagittale du Fœtus",
        description: "Coupe sagittale du fœtus, passant par les structures de la ligne médiane",
        criteria: ["Aspect de la paroi abdominale", "Aspect du rachis", "Mesure de la LCC"],
        images: [require("@/assets/data/iconography/1_1.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Axiale Complémentaire de l'Abdomen",
                description: "Coupe axiale de l'abdomen passant par le départ du cordon ombilical",
                criteria: ["Aspect de la paroi abdominale"],
                images: [require("@/assets/data/iconography/1_bonus_1.png")]
            },
            {
                id: randomUUID(),
                title: "Coupe Sagittale Complémentaire du Fœtus ",
                description: "Coupe sagittale du fœtus passant par le rachis",
                criteria: ["Aspect du rachis"],
                images: [require("@/assets/data/iconography/1_bonus_2.png")]
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale de la Tête Fœtale",
        description: "Coupe axiale, passant par les structures du pôle céphalique",
        criteria: ["Contour céphalique", "Aspect de la ligne médiane", "Mesure du diamètre bipariétal"],
        images: [require("@/assets/data/iconography/1_2.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale Médiane",
        description: "Coupe sagittale médiane, passant par les structures de la ligne médiane du pôle céphalique",
        criteria: ["Aspect du profil", "Présence des os propres du nez", "Mesure de l'épaisseur de la CN"],
        images: [require("@/assets/data/iconography/1_3.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale de l'Abdomen",
        description: "Coupe axiale de l'abdomen, passant par les structures abdominales",
        criteria: ["Visualisation de l'estomac en position habituelle", "Mesure du diamètre abdominal transverse avec les calipers en place"],
        images: [require("@/assets/data/iconography/1_4.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        description: "Coupe axiale du thorax, passant par les structures thoraciques du fœtus",
        criteria: ["Cœur visible avec équilibre droite/gauche des cavités cardiaques", "Position du cœur"],
        images: [require("@/assets/data/iconography/1_5.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe des Fémurs",
        description: "Coupe passant par les fémurs qui illustre uniquement la présence des deux fémurs",
        criteria: ["Présence de deux membres inférieurs"],
        images: [require("@/assets/data/iconography/1_6.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe des 2 Membres Inférieurs",
        description: "Coupe passant par les 2 membres inférieurs",
        criteria: ["Présence de deux membres inférieurs comportant chacun trois segments"],
        images: [require("@/assets/data/iconography/1_7.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe des 2 Membres Supérieurs",
        description: "Coupe passant par les 2 membres supérieurs",
        criteria: ["Présence de deux membres supérieurs comportant chacun trois segments"],
        images: [require("@/assets/data/iconography/1_8.png")]
    },
    {
        id: randomUUID(),
        title: "Coupe du raccord membrane-trophoblaste",
        description: "Coupe passant par le raccordement des membranes au thophoblaste en cas de grossesse multiple",
        criteria: ["Chorionicité"],
        images: [require("@/assets/data/iconography/1_9.png"), require("@/assets/data/iconography/1_9_bis.png")]
    }
];

const IconographyView = () => {

    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(IconographyWidget);
        setWidgetData(IconographyWidgetData);
    }, []);

    return (
        widget &&
        <View
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={{
                width: "100%",
                padding: 10,
                gap: 10
            }}>
                <TrimesterCard title={"Premier Trimestre"} iconographyList={firstTrimesterIconographyList} />
            </View>
        </View>
    );
};

export default withScrollView(IconographyView);