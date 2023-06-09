
import {View, FlatList, Button} from 'react-native'
import ProductCard from './ProductCard';

const ItemList = ({item, onBackPress}) => {

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <FlatList
            data={item}
            renderItem={({item}) => (
              <ProductCard item={item} />
            )}
            numColumns={1}
          />
          <Button onPress={onBackPress} title='back' style={{ padding: '50'}}/>
        </View>
      );
}

export default ItemList;