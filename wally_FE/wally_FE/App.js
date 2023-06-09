import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button, Image} from 'react-native'
import {Camera} from 'expo-camera'
import CameraPreview from './components/CameraPreview'
import ItemList from './components/itemList'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [startCamera,setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [image, setImage] = React.useState(null);
  const [object, setObject] = React.useState("");
  const [itemLoaded, setItemLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [mainScreen, setMainScreen] = React.useState(true);


  const __onBackPress = () => {
    setMainScreen(true);
  }


  const __pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      __detectImage(result.assets[0]);
    }
  };

  let camera

  const __startCamera = async () => {
    const {status} = await Camera.requestPermissionsAsync()
    if (status === 'granted') {
      // start the camera
      setStartCamera(true)
      camera = Camera
    } else {
      Alert.alert('Access denied')
    }
  }


  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log("photo is", photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
    __detectImage(photo);
  }  
  

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }


  const __savePhoto = () => {

  }

  const __detectImage = async (photo) => {
    
    let img_to_upload = {  
      type: 'image/jpeg',    
      name: 'random-file-name',  
      uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    };  

    let formData = new FormData();
    formData.append("title", 'this is tandom text');
    formData.append("file", img_to_upload);

    axios({
      method: 'POST',
      url: "http://localhost:5000/recognize/image",  
      data: formData,
      transformRequest: (data, headers) => {
        return formData;
      }, 
      headers: { 
        "Content-Type": "multipart/form-data; charset=utf-8; boundary=------random-boundary",
      }
    })
    .then((response) => {
       console.log("response : ");  
       console.log(response.data);    
       if(response && response.data && response.data.length > 0) {
        setObject(response.data[0].class);
        __getItems(response.data.map(e => e.class));
       }

    }, (error) => {
        console.log("error : "); 
        console.log(error); 
    })
  }


  const __getItems = async(items) => {
    axios({
      method: 'POST',
      url: "http://localhost:5000/item/",  
      data: {items: items},
      headers: { 
        "Content-Type": "application/JSON",
      }
    })
    .then((response) => {
       console.log("response : ");  
       console.log(response.data);    
       setItemLoaded(true);
       setItems(response.data);
       setMainScreen(false);

    }, (error) => {
        console.log("error : "); 
        console.log(error); 
    })
  }

  return <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {itemLoaded && !mainScreen
        ? <ItemList item={items} onBackPress={__onBackPress}/> 
        : <>            
            <Text>Welcome</Text>
            <Button title="Pick an image from camera roll" onPress={__pickImage}/>
            <Button title="capture an image from camera" onPress={__pickImage}/>
          </> 
      }   
      </View>
      </>
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})