import React from 'react';
import {View, Text, Pressable, Image, StyleSheet, Alert, Button} from 'react-native';

export default function ProductCard({item}) {
  
  const {name, price, uri} = item;

  const __onTap = () => {
    Alert.alert('Congratulations', 'Item is added to the cart')
    //todo: write the cart and checkout calls here
  }

  return (
    <Pressable style={styles.container}>
      <View
        >
        <Image 
        resizeMode='contain'
        style={{height:200, width:180}} 
        source={{ uri:uri}} />
      </View>
      <View style={{paddingVertical: 3}}>
        <Text style={styles.text}>{name?.substring(0, 20)} </Text>
      </View>

      <View style={{paddingVertical: 5}}>
        <Text
          style={styles.text}>{price}</Text>
      </View>
      <Button title='Add To Cart' onPress={__onTap} />
    </Pressable>
  );
}

const styles = StyleSheet.create ({
  container: {
     padding: 10,
     marginTop: 3,
     backgroundColor: 'skyblue',
     alignItems: 'center',
  },
  text: {
     color: '#4f603c'
  }
})