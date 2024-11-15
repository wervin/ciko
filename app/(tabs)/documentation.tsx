import withScrollView from '../_components/wrapper';
import { View, Text, Alert, Platform, Linking } from 'react-native';
import PressableOpacity from '@/components/pressableOpacity';
import { pink, pinkDark } from '@/utils/colors';
import { Asset } from 'expo-asset';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import { ReactNode, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { ClipboardList } from 'lucide-react-native';
import EchographyIcon from "@/assets/images/echo.svg"

type Document = {
    id: string,
    title: string,
    subtitle: string,
    asset: Asset,
    icon: () => ReactNode,
};

interface DocumentCardProps {
    document: Document;
};

const documents: Document[] = [
    {
        id: randomUUID(),
        title: "Rapport et Recommandations",
        subtitle: "CNEOF 2023",
        asset: Asset.fromModule(require("@/assets/data/cneof-2023.pdf")),
        icon: () => <ClipboardList color={pinkDark.pink7} size={60} strokeWidth={1.25} />
    },
    {
        id: randomUUID(),
        title: "Iconographies Recommandées",
        subtitle: "CNEOF 2023",
        asset: Asset.fromModule(require("@/assets/data/cneof-2023-merged.pdf")),
        icon: () => <EchographyIcon color={pinkDark.pink7} />
    }
]

const DocumentCard = ({ document }: DocumentCardProps) => {
    const [isIntentActive, setIsIntentActive] = useState(false);

    const openPDF = async () => {
        if (isIntentActive) return;

        // Load the asset
        await document.asset.downloadAsync();

        // Get the local URI of the asset
        const assetUri = document.asset.localUri || document.asset.uri;

        if (Platform.OS === 'android') {
            // Get content URI and grant permissions
            const contentUri = await FileSystem.getContentUriAsync(assetUri);

            // Prepare the intent
            const intentParams = {
                data: contentUri,
                flags: 1, // Intent.FLAG_GRANT_READ_URI_PERMISSION
                type: 'application/pdf',
            };

            setIsIntentActive(true);

            // Launch the intent
            try {
                await IntentLauncher.startActivityAsync('android.intent.action.VIEW', intentParams);
            } catch (error) {
            } finally {
                setIsIntentActive(false);
            }
        }
        else if (Platform.OS === 'ios') {
            // Open the file with Linking
            const fileUri = encodeURI(assetUri);
            if (await Linking.canOpenURL(fileUri)) {
                await Linking.openURL(fileUri);
            }
        }
    };

    return (
        <PressableOpacity
            style={{
                height: 90,
                width: "100%",
                flexDirection: "row",
            }}
            onPress={openPDF}
        >
            <View style={{
                flex: 1,
                backgroundColor: pink.pink5,
                borderColor: pink.pink6,
                borderWidth: 1,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                justifyContent: "center",
                paddingHorizontal: 10,
            }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        color: pinkDark.pink7,
                    }}
                >
                    {document.title}
                </Text>

                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: pinkDark.pink3,
                    }}
                >
                    {document.subtitle}
                </Text>
            </View>

            <View style={{
                backgroundColor: pink.pink6,
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 90,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                flexDirection: "row"
            }}
            >
                {document.icon()}
            </View>
        </PressableOpacity>
    )
};

const Documentation = () => {
    return (
        <View
            style={{
                gap: 10,
                padding: 10,
            }}
        >
            {
                documents.map((document) =>
                    <DocumentCard key={document.id} document={document} />
                )
            }
        </View>
    );
}

export default withScrollView(Documentation);