
import {Text, View, Image} from 'react-native'

const CameraPreview = ({photo, object}) => {

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Image source={{uri: photo && photo.uri}}
            style={{ width: 200, height: 200 }} />
        <Text>{object}</Text>
      </View>
    )
  }

export default CameraPreview;