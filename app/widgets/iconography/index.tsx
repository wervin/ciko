import { View, Text } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect, useState } from "react";
import { IconographyWidget, IconographyWidgetData } from "../_widgets";
import { Iconography } from "./iconography";
import { randomUUID } from "expo-crypto";
import { TrimesterCard } from "./trimesterCard";
import { IconographyModal } from "./iconographyModal";

const firstTrimesterIconographyList: Iconography[] = [
    {
        id: randomUUID(),
        title: "Coupe Sagittale du Fœtus",
        subtitles: [],
        description: "Coupe sagittale du fœtus, passant par les structures de la ligne médiane",
        criteria: ["Aspect de la paroi abdominale", "Aspect du rachis", "Mesure de la LCC"],
        images: [require("@/assets/data/iconography/1_1.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Axiale de l'Abdomen",
                subtitles: [],
                description: "Coupe axiale de l'abdomen passant par le départ du cordon ombilical",
                criteria: ["Aspect de la paroi abdominale"],
                images: [require("@/assets/data/iconography/1_bonus_1.png")],
                alternatives: []
            },
            {
                id: randomUUID(),
                title: "Coupe Sagittale du Fœtus ",
                subtitles: [],
                description: "Coupe sagittale du fœtus passant par le rachis",
                criteria: ["Aspect du rachis"],
                images: [require("@/assets/data/iconography/1_bonus_2.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale de la Tête Fœtale",
        subtitles: [],
        description: "Coupe axiale, passant par les structures du pôle céphalique",
        criteria: ["Contour céphalique", "Aspect de la ligne médiane", "Mesure du diamètre bipariétal"],
        images: [require("@/assets/data/iconography/1_2.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale Médiane",
        subtitles: [],
        description: "Coupe sagittale médiane, passant par les structures de la ligne médiane du pôle céphalique",
        criteria: ["Aspect du profil", "Présence des os propres du nez", "Mesure de l'épaisseur de la CN"],
        images: [require("@/assets/data/iconography/1_3.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale de l'Abdomen",
        subtitles: [],
        description: "Coupe axiale de l'abdomen, passant par les structures abdominales",
        criteria: ["Visualisation de l'estomac en position habituelle", "Mesure du diamètre abdominal transverse"],
        images: [require("@/assets/data/iconography/1_4.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Axiale du Thorax Fœtale",
                subtitles: [],
                description: "Coupes axiales du thorax foetal passant par les structures cardiaques et les gros vaisseaux, en mode Doppler couleur",
                criteria: ["Équilibre droite/gauche habituel des cavités cardiaques"],
                images: [require("@/assets/data/iconography/1_bonus_3.png"), require("@/assets/data/iconography/1_bonus_3_bis.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les structures thoraciques du fœtus",
        criteria: ["Cœur visible avec équilibre droite/gauche des cavités cardiaques", "Position du cœur"],
        images: [require("@/assets/data/iconography/1_5.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe des Fémurs",
        subtitles: [],
        description: "Coupe passant par les fémurs qui illustre uniquement la présence des deux fémurs",
        criteria: ["Présence de deux membres inférieurs"],
        images: [require("@/assets/data/iconography/1_6.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe des 2 Membres Inférieurs",
        subtitles: [],
        description: "Coupe passant par les 2 membres inférieurs",
        criteria: ["Présence de deux membres inférieurs comportant chacun trois segments"],
        images: [require("@/assets/data/iconography/1_7.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe des Membres Inférieurs",
                subtitles: [],
                description: "Coupes pour chacun des membres inférieurs. Une image est attendue par coté et chacun des membres peut être illustré dans un plan coronal ou longitudinal",
                criteria: ["Présence de deux membres inférieurs comportant chacun trois segments"],
                images: [require("@/assets/data/iconography/1_bonus_4.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe des 2 Membres Supérieurs",
        subtitles: [],
        description: "Coupe passant par les 2 membres supérieurs",
        criteria: ["Présence de deux membres supérieurs comportant chacun trois segments"],
        images: [require("@/assets/data/iconography/1_8.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe des Membres Supérieurs",
                subtitles: [],
                description: "Coupes pour chacun des membres supérieurs. Une image est attendue par coté et chacun des membres peut être illustré dans un plan coronal ou longitudinal",
                criteria: ["Présence de deux membres supérieurs comportant chacun trois segments"],
                images: [require("@/assets/data/iconography/1_bonus_5.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe du Raccord Membrane-Trophoblaste",
        subtitles: ["Grossesse Bichoriale", "Grossesse Monochoriale"],
        description: "Coupe passant par le raccordement des membranes au thophoblaste en cas de grossesse multiple",
        criteria: ["Chorionicité"],
        images: [require("@/assets/data/iconography/1_9.png"), require("@/assets/data/iconography/1_9_bis.png")],
        alternatives: []
    }
];

const secondTrimesterIconographyList: Iconography[] = [
    {
        id: randomUUID(),
        title: "Coupe Axiale du Pôle Céphalique",
        subtitles: [],
        description: "Coupe axiale du pôle céphalique, passant par les structures cérébrales",
        criteria: ["Aspect du contour de la boîte crânienne", "Aspect des ventricules cérébraux", "Aspect de la ligne médiane", "Présence et aspect du cavum du septum pellucidum", "Présence du corps calleux", "Mesures du périmètre céphalique et du diamètre bipariétal"],
        images: [require("@/assets/data/iconography/2_1.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Sagittale Médiane du Pôle Céphalique",
                subtitles: [],
                description: "Coupe sagittale médiane du pôle céphalique passant par les structures cérébrales",
                criteria: ["Aspect de la ligne médiane", "Présence du corps calleux", "Présence et aspect du cavum du septum pellucidum"],
                images: [require("@/assets/data/iconography/2_bonus_3.png")],
                alternatives: []
            },
            {
                id: randomUUID(),
                title: "Coupe Coronale du Pôle Céphalique",
                subtitles: [],
                description: "Coupe coronale du pôle céphalique passant par les structures cérébrales",
                criteria: ["Aspect de la ligne médiane", "Présence du corps calleux", "Présence et aspect du cavum du septum pellucidum"],
                images: [require("@/assets/data/iconography/2_bonus_4.jpeg")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale Oblique du Pôle Céphalique",
        subtitles: [],
        description: "Coupe axiale oblique du pôle céphalique, passant par les structures cérébrales et la fosse postérieure",
        criteria: ["Aspect des espaces liquidiens de la fosse postérieure", "Aspect du cervelet", "Aspect de la ligne médiane", "Présence du corps calleux", "Présence et aspect du cavum du septum pellucidum", "Mesure du diamètre transverse du cervelet"],
        images: [require("@/assets/data/iconography/2_2.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Sagittale Médiane du Pôle Céphalique",
                subtitles: [],
                description: "Coupe sagittale médiane du pôle céphalique passant par les structures cérébrales",
                criteria: ["Aspect de la ligne médiane", "Présence du corps calleux", "Présence et aspect du cavum du septum pellucidum"],
                images: [require("@/assets/data/iconography/2_bonus_3.png")],
                alternatives: []
            },
            {
                id: randomUUID(),
                title: "Coupe Coronale du Pôle Céphalique",
                subtitles: [],
                description: "Coupe coronale du pôle céphalique passant par les structures cérébrales",
                criteria: ["Aspect de la ligne médiane", "Présence du corps calleux", "Présence et aspect du cavum du septum pellucidum"],
                images: [require("@/assets/data/iconography/2_bonus_4.jpeg")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale Médiane de la Face Fœtale",
        subtitles: [],
        description: "Coupe sagittale médiane de la face fœtale, passant par les structures du profil",
        criteria: ["Aspect du “profil” fœtal"],
        images: [require("@/assets/data/iconography/2_3.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Frontale de la Face Fœtale",
        subtitles: [],
        description: "Coupe frontale de la face fœtale, passant par les structures de la face",
        criteria: ["Continuité de la lèvre supérieure"],
        images: [require("@/assets/data/iconography/2_4.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Pôle Céphalique",
        subtitles: [],
        description: "Coupe axiale du pôle céphalique, passant par les structures de la face",
        criteria: ["Présence de deux globes oculaires"],
        images: [require("@/assets/data/iconography/2_5.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les quatre cavités cardiaques et les structures thoracique",
        criteria: ["Position et orientation du cœur", "Présence et aspect des quatre cavités cardiaques", "Concordances ventriculo-artérielles", "Aspect des poumons"],
        images: [require("@/assets/data/iconography/2_6.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par la voie d'éjection gauche et les structures thoraciques",
        criteria: ["Concordances ventriculo-artérielles"],
        images: [require("@/assets/data/iconography/2_7.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les gros vaisseaux et les structures thoraciques",
        criteria: ["Position et aspect des gros vaisseaux", "Concordances ventriculo-artérielles"],
        images: [require("@/assets/data/iconography/2_8.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Oblique du Thorax",
                subtitles: [],
                description: "Coupe oblique du thorax passant par les cavités droites et le croisement des gros vaisseaux",
                criteria: ["Position et aspect des gros vaisseaux"],
                images: [require("@/assets/data/iconography/2_bonus_2.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les crosses du canal artériel et de l'aorte et les structures thoracique",
        criteria: ["Position et aspect des gros vaisseaux"],
        images: [require("@/assets/data/iconography/2_9.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Para-Sagittale Gauche",
        subtitles: [],
        description: "Coupe para-sagittale gauche, passant par la coupole diaphragmatique gauche et les structures du tronc",
        criteria: ["Interface thoraco-abdominale gauche", "Présence, aspect et position de l'estomac", "Aspect des poumons"],
        images: [require("@/assets/data/iconography/2_10.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Tronc",
        subtitles: [],
        description: "Coupe axiale du tronc, passant par les structures abdominales",
        criteria: ["Présence, aspect et position de l'estomac", "Mesure du périmètre abdominal"],
        images: [require("@/assets/data/iconography/2_11.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Tronc",
        subtitles: [],
        description: "Coupe axiale du tronc (éventuellement en mode Doppler couleur), passant par les structures abdominale",
        criteria: ["Présence de la vésicule biliaire"],
        images: [require("@/assets/data/iconography/2_12.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Tronc",
        subtitles: [],
        description: "Coupe axiale du tronc, passant par les deux reins",
        criteria: ["Présence, position et aspect des reins", "Aspect du rachis"],
        images: [require("@/assets/data/iconography/2_13.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale du Tronc",
        subtitles: [],
        description: "Coupe sagittale du tronc, passant par les structures rachidiennes",
        criteria: ["Aspect du rachis"],
        images: [require("@/assets/data/iconography/2_14.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale Oblique du Tronc",
        subtitles: [],
        description: "Coupe axiale oblique du tronc, en mode Doppler couleur, passant par les structures pelviennes et les artères ombilicales",
        criteria: ["Aspect de la paroi abdominale antérieure", "Présence et aspect de la vessie"],
        images: [require("@/assets/data/iconography/2_15.png")],
        alternatives: [
            {
                id: randomUUID(),
                title: "Coupe Axiale de l'Abdomen",
                subtitles: [],
                description: "Coupe axiale de l'abdomen passant par le départ du cordon ombilical",
                criteria: ["Aspect de la paroi abdominale"],
                images: [require("@/assets/data/iconography/2_bonus_1.png")],
                alternatives: []
            }
        ]
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale de l'Utérus",
        subtitles: [],
        description: "Coupe sagittale de l'utérus centrée sur l'orifice interne du col",
        criteria: ["Localisation du placenta"],
        images: [require("@/assets/data/iconography/2_16.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Longitudinale du Fémur",
        subtitles: [],
        description: "Coupe longitudinale du fémur passant par sa diaphyse",
        criteria: ["Mesure de la longueur fémorale"],
        images: [require("@/assets/data/iconography/2_17.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Longitudinale du Fémur",
        subtitles: [],
        description: "Coupe longitudinale du fémur passant par sa diaphyse",
        criteria: ["Présence de 2 fémurs"],
        images: [require("@/assets/data/iconography/2_18.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe des Membres Inférieurs",
        subtitles: [],
        description: "Coupes pour chacun des membres inférieurs. Une image est attendue par coté. Chacun des membres peut être illustré dans un plan coronal ou longitudinal",
        criteria: ["Présence de quatre membres", "Présence des trois segments de chaque membre"],
        images: [require("@/assets/data/iconography/2_19.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe des Membres Supérieurs",
        subtitles: [],
        description: "Coupes pour chacun des membres supérieurs. Une image est attendue par coté. Chacun des membres peut être illustré dans un plan coronal ou longitudinal",
        criteria: ["Présence de quatre membres", "Présence des trois segments de chaque membre"],
        images: [require("@/assets/data/iconography/2_20.png")],
        alternatives: []
    }
];

const thirdTrimesterIconographyList: Iconography[] = [
    {
        id: randomUUID(),
        title: "Coupe Axiale du Pôle Céphalique",
        subtitles: [],
        description: "Coupe axiale du pôle céphalique, passant par les structures cérébrales",
        criteria: ["Aspect du contour de la boîte crânienne", "Aspect des ventricules cérébraux", "Aspect de la ligne médiane", "Présence et aspect du cavum du septum pellucidum", "Mesures du périmètre céphalique et du diamètre bipariétal"],
        images: [require("@/assets/data/iconography/3_1.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale Oblique du Pôle Céphalique",
        subtitles: [],
        description: "Coupe axiale oblique du pôle céphalique, passant par les structures cérébrales et la fosse postérieure",
        criteria: ["Aspect des espaces liquidiens de la fosse postérieure", "Aspect du cervelet", "Aspect de la ligne médiane", "Présence et aspect du cavum du septum pellucidum", "Mesure du diamètre transverse du cervelet"],
        images: [require("@/assets/data/iconography/3_2.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les quatre cavités cardiaques et les structures thoracique",
        criteria: ["Position et orientation du cœur", "Présence et aspect des quatre cavités cardiaques", "Aspect des poumons"],
        images: [require("@/assets/data/iconography/3_3.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par la voie d'éjection gauche et les structures thoraciques",
        criteria: ["Concordances ventriculo-artérielles"],
        images: [require("@/assets/data/iconography/3_4.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les gros vaisseaux et les structures thoraciques",
        criteria: ["Position et aspect des gros vaisseaux"],
        images: [require("@/assets/data/iconography/3_5.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Thorax",
        subtitles: [],
        description: "Coupe axiale du thorax, passant par les crosses du canal artériel et de l'aorte et les structures thoraciques",
        criteria: ["Position et aspect des gros vaisseaux"],
        images: [require("@/assets/data/iconography/3_6.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Tronc",
        subtitles: [],
        description: "Coupe axiale du tronc, passant par les structures abdominales",
        criteria: ["Présence, aspect et position de l'estomac", "Mesure du périmètre abdominal"],
        images: [require("@/assets/data/iconography/3_7.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Axiale du Tronc",
        subtitles: [],
        description: "Coupe axiale du tronc, passant par les deux reins",
        criteria: ["Présence, position et aspect des reins", "Aspect du rachis"],
        images: [require("@/assets/data/iconography/3_8.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Sagittale du Tronc",
        subtitles: [],
        description: "Coupe sagittale du tronc, passant par les structures rachidiennes",
        criteria: ["Aspect du rachis lombo-sacré"],
        images: [require("@/assets/data/iconography/3_9.png")],
        alternatives: []
    },
    {
        id: randomUUID(),
        title: "Coupe Longitudinale du Fémur ",
        subtitles: [],
        description: "Coupe longitudinale du fémur passant par sa diaphyse",
        criteria: ["Mesure de la longueur fémorale"],
        images: [require("@/assets/data/iconography/3_10.png")],
        alternatives: []
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
        <>
            <IconographyModal />
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
                    <TrimesterCard title={"Deuxième Trimestre"} iconographyList={secondTrimesterIconographyList} />
                    <TrimesterCard title={"Troisième Trimestre"} iconographyList={thirdTrimesterIconographyList} />
                </View>
            </View>
        </>
    );
};

export default withScrollView(IconographyView);