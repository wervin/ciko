import { pink, pinkDark } from '@/utils/colors';
import { useState } from 'react';
import {
    ScrollView,
    Image,
    StyleSheet,
    View,
    Text,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ImageSourcePropType,
} from 'react-native';


interface ImageSliderProps {
    images: ImageSourcePropType[];
    subtitles: string[];
};

const ImageSlider = ({ images, subtitles }: ImageSliderProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [parentDimensions, setParentDimensions] = useState<{ width: number; height: number } | null>(null);

    const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffset / slideSize);
        setActiveIndex(index);
    };

    const onLayoutView = (event: any) => {
        const { width, height } = event.nativeEvent.layout;
        if (width !== parentDimensions?.width || height !== parentDimensions?.height) {
            setParentDimensions({ width, height });
        }
    };

    return (
        <View onLayout={onLayoutView}>
            {parentDimensions &&
                <ScrollView
                    style={{
                        width: parentDimensions.width
                    }}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                >
                    {images.map((image, index) => (
                        <Image source={image} style={{ width: parentDimensions.width, height: parentDimensions.width }} key={index} />
                    ))}
                </ScrollView>
            }
            {
                subtitles.length > 0 &&
                <View style={styles.subtitles}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: pink.pink4
                    }}>
                        {subtitles[activeIndex]}
                    </Text>
                </View>
            }
            {
                images.length > 1 &&
                <View style={styles.pagination}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                activeIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    subtitles: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        margin: 3,
        width: 14,
        height: 14,
        borderRadius: 14,
    },
    activeDot: {
        backgroundColor: pink.pink7,
    },
    inactiveDot: {
        backgroundColor: pink.pink5,
    },
});

export default ImageSlider;
