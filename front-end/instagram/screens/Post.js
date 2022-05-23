import React,{useState, useEffect} from 'react';
import { Text,View,StyleSheet,Button,Image,TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Camer from '../components/Camer'
function Post(){
    const [image, setImage] = useState(null);
    const [toggleCamera, setToggleCamera] = useState(false)
    
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      //console.log("result",result);
        setImage(result.uri);
    }
};

    return (
      <View style={styles.container}>
        {toggleCamera ? (
          <Camer></Camer>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImage}
            >
              <Text>Pick an image from camera roll</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setToggleCamera(!toggleCamera)}
              >
              <Text>Take A Photo</Text>
              </TouchableOpacity>
          </>
        )}
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
}
const styles = StyleSheet.create({
    // mainView:{
    //      flex: 1, alignItems: 'center', justifyContent: 'center' 
    // },
    container: {
        flex: 1,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
      },
      button: {
        
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
      captureButton:{
          width:200, height: 200,
      },
})
export default Post;