import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Pressable } from 'react-native';

export const CardComponent = (props) => {
    const { cardNumber, cardRevealed, disableClick = false } = props.item;
    const onClickCallback = props.onClickCallback;
    const index = props.index;
    const testId= props.testID;
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const { cardWrapper, cardBack, cardFront,textStyle } = style;
    flipAnimation.addListener(({ value }) => flipRotation = value);
    const flipToFrontStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["0deg", "180deg"]
                })
            }
        ]
    };

    const flipToBackStyle = {
        transform: [
            {
                rotateY: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ["180deg", "360deg"]
                })
            }
        ]
    };

    const flip = (showBack, timing) => {
        Animated.timing(flipAnimation, {
            toValue: showBack ? 0 : 180,
            duration: timing,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        flip(cardRevealed, 300);
    }, [props]);

    useEffect(() => {
        flip(cardRevealed, 0);
    }, []);

    const onClickCards = () => {
        !disableClick && onClickCallback({
            ...props.item,
            cardRevealed: !cardRevealed
        }, index)
    }
    return (
        <Pressable
            style={cardWrapper}
            onPress={onClickCards}
            testID={testId}
        >
            <Animated.View
                style={{ ...cardFront, ...flipToBackStyle }}
                testID={'AnimatedViewFront'}
            >
                <Text style={textStyle} testID={'backSideText'}>?</Text>
            </Animated.View>
            <Animated.View
                style={{ ...cardBack, ...flipToFrontStyle }}
                testID={'AnimatedViewBack'}
            >
                <Text style={textStyle} testID={'frontSideText'}>{cardNumber}</Text>
            </Animated.View>

        </Pressable>
    );
}

const style = StyleSheet.create({
    cardWrapper: { width: 100, height: 200, marginVertical: 7 },
    cardFront: {
        position: "absolute",
        backfaceVisibility: "hidden",
        width: 100, height: 200, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center',
    },
    cardBack: {
        position: "absolute",
        width: 100, height: 200, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center',
        backfaceVisibility: "hidden"
    },
    textStyle: { fontWeight: 'bold', color: '#fff', fontSize: 25 }
});