import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, FlatList, TouchableOpacity, Alert } from 'react-native';
import { CardComponent } from '../components/CardComponent';
import { setCardsData } from '../utils/utility';

export const GameScreen = () => {
    const CARD_PAIRS_VALUE = 2;
    const [cardsList, setCardList] = useState(setCardsData(CARD_PAIRS_VALUE));
    const [currentCard, setCurrentCard] = useState(null);
    const [totalSteps, setTotalSteps] = useState(0);
    const [disableClick, setDisableClick] = useState(0);
    const {containerStyle,columnWrapperStyle, restartContainer} = styles;

    const onRestartPress = () => {
        setCardList(setCardsData(CARD_PAIRS_VALUE))
        setTotalSteps(0);
        setCurrentCard(null)
    }

    const showAlert = () =>{
        Alert.alert("Congratulations", `Congratulations you solved the game in ${totalSteps+1} steps`, [{
            text: "Restart",
            onPress: onRestartPress,
        }])
    }
    const checkIfCompleted = (array) => {
        const isCompleted = array.reduce((prev, current)=>{
         return prev && current.cardRevealed
       }, true);

       if(isCompleted){
        showAlert();
       }
      
    }
    const onCardClickCallback = (clickedItem, index) => {
        const arr = [...cardsList]
        arr[index] = clickedItem;
        setCardList(arr);
        setTotalSteps(totalSteps + 1);
        if (currentCard == null) {
            setCurrentCard({ ...clickedItem, index })
        }
        else {
            if (currentCard.cardRevealed && clickedItem.cardRevealed && (currentCard.cardNumber !== clickedItem.cardNumber)) {
                setDisableClick(true)
                setTimeout(() => {
                    arr[index] = { ...clickedItem, cardRevealed: false }
                    arr[currentCard.index] = { ...currentCard, cardRevealed: false }
                    setCurrentCard(null);
                    setCardList(arr);
                    setDisableClick(false)
                }, 1000);
            }
            else if (currentCard.cardRevealed && clickedItem.cardRevealed && (currentCard.cardNumber === clickedItem.cardNumber)) {
                arr[index] = { ...clickedItem, disableClick: true }
                arr[currentCard.index] = { ...currentCard, disableClick: true }
                setCurrentCard(null);
                setCardList(arr);
                checkIfCompleted(arr);
            }
        }
    }

    return (
        <View style={containerStyle} pointerEvents={disableClick ? 'none' : 'auto'}>
            <View style={restartContainer}>
                <TouchableOpacity onPress={onRestartPress} testID={'restart'}>
                    <Text>Restart</Text>
                </TouchableOpacity>
                <Text testID={'steps'}>{`Steps : ${totalSteps}`}</Text>
            </View>
            <FlatList
                testID='datalist'
                data={cardsList}
                keyExtractor={(_, index) => "" + index}
                extraData={cardsList}
                numColumns={3}
                columnWrapperStyle={columnWrapperStyle}
                renderItem={({ item, index }) => {
                    return <CardComponent 
                     testID={`card${index}`}
                    item={item} onClickCallback={onCardClickCallback} index={index}></CardComponent>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
 containerStyle: { paddingHorizontal: 20, alignContent: 'center', flex: 1, paddingVertical: 50 },
 restartContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
 columnWrapperStyle:{ justifyContent: 'space-between' },
});