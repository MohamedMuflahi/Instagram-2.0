import React,{useState, useEffect} from 'react';
import { Text,View,StyleSheet,TextInput,Image,Button,TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
const Stack = createStackNavigator();
function OptionPicker({navigation}){
  const isFocused = useIsFocused();
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
    // here we will do the magic after it saves the photo
    navigation.navigate('Photo', {
        image: photo
      })
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
    {isFocused&& <Camera style={styles.camera} type={type} ref={ref => {
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
        </Camera>}
        
            
            <TouchableOpacity style={styles.captureButton} onPress={()=>{takePicture()}} />
            </View>
  )
}
function PhotoTaken({route}){
  const [caption, setCaption] = useState('');
  const { image } = route.params;
  return(
   <>
     <Image style={styles.image} source={{uri: image.uri}}/>
     <TextInput
        style={styles.caption}
        onChangeText={setCaption}
        value={caption}
        placeholder="Write a caption"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
   </>
  )
}
function Camer(){
   
    return(
      <Stack.Navigator>
        <Stack.Screen name='Take Picture' component={OptionPicker} options={{unmountOnBlur: true}} />
        <Stack.Screen name='Photo' component={PhotoTaken} options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert('This is a button!')}
              style={styles.headerButton}
            ><Ionicons name='ios-checkmark' size={25} color='black' /></TouchableOpacity>
          ),
        }}/>
      </Stack.Navigator>
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
        backgroundColor: 'black',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius:180,
        marginVertical: 20,
        width: 75, height: 75,
      },
      image:{
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height/1.5,
      },
      caption:{
        marginBottom: 20,
        width: Dimensions.get('window').width*0.9,
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: "black",
        color: "#fff"
      },
      headerButton:{
        // backgroundColor: 'black',
        marginRight: 20,
        height: 25,
        width: 25,
      },
})
export default Camer;