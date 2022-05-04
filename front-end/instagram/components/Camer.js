import React,{useState, useEffect} from 'react';
import { Text,View,StyleSheet,Button,Image,TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

function Camer(){
    const [photo, setPhoto] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let camera;
    const takePicture = () => {
        if (camera) {
            camera.takePictureAsync({ onPictureSaved: onPictureSaved });
        }
     };
  
    const onPictureSaved = photo => {
        setPhoto(photo.uri)
        console.log(photo);
    } 
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    const turnOnCamera = () =>{

    }
    return(
        <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={ref => {
    camera = ref;
  }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
            {photo ? <Image style={styles.captureButton}  source={{ uri: photo }} />: null}
            <TouchableOpacity style={styles.captureButton} onPress={()=>{takePicture()}} />
            </View>
    )
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
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: 'white',
      },
      captureButton:{
          width:200, height: 200,
      },
})
export default Camer;