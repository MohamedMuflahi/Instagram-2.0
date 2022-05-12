import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Button,
  TouchableOpacity,ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import * as FaceDetector from 'expo-face-detector';
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import Instagram from './Instagram'
const Stack = createStackNavigator();
function OptionPicker({ navigation }) {
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

  const onPictureSaved = (photo) => {
    setPhoto(photo.uri);
    // here we will do the magic after it saves the photo
    navigation.navigate("Photo", {
      image: photo,
    });
    // console.log("photo", photo);
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const turnOnCamera = () => {};
  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            camera = ref;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
             <Ionicons name="camera-reverse" size={50} color="white" />
              {/* <Text style={styles.text}> Flip</Text> */}
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => {
          takePicture();
        }}
      >
      <Ionicons name="ios-stop-circle-outline" size={75} color="black" />
{/* ios-stop-circle-outline */}
      </TouchableOpacity>
    </View>
  );
}
function PhotoTaken({ route,navigation }) {
  const [caption, setCaption] = useState("");
  const currentUser = useSelector((state) => state.user.value);
  const { image } = route.params;
  let localUri = image.uri;
  let filename = localUri.split("/").pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  let formData = new FormData();
  formData.append("image", { uri: localUri, name: filename, type });
  formData.append("caption", caption);
  formData.append("user_id", currentUser.id);
  function handleSubmit() {
    fetch("http://192.168.1.7:3000/post", {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        navigation.navigate("gallery")
      });
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: image.uri }} />
      <TextInput
        style={styles.caption}
        onChangeText={setCaption}
        value={caption}
        placeholder="Write a caption"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.checkmark}>
        <Ionicons name="ios-checkmark" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('filter',{
        photo: image.uri
      })}>
        <Ionicons name="ios-checkmark" size={100} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
}
function ImageChoose({ navigation }) {
  const [image, setImage] = useState(null);
  const [toggleCamera, setToggleCamera] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      navigation.navigate("Photo", {
        image: result,
      });
    }
  };
  return (
    <>
    <TouchableOpacity
              style={styles.button}
              onPress={pickImage}
            >
             <Ionicons name="albums" size={100} color="black" />
            </TouchableOpacity>
            <Text style={styles.ortext} >OR ...</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Take Picture")}
              >
              <Ionicons name="camera" size={100} color="black" />
              </TouchableOpacity>
    </>
  );
}
function Camer() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="gallery" component={ImageChoose} options={{ title: '' }}/>
      <Stack.Screen
        name="Take Picture"
        component={OptionPicker}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoTaken}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => alert("This is a button!")}
              style={styles.headerButton}
            >
              <Ionicons name="ios-checkmark" size={25} color="black" />
            </TouchableOpacity>
          ),
          title: ''
        }}
      />
      {/* Instagram */}
      <Stack.Screen name="filter" component={Instagram} options={{ title: ''}}/>
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  // mainView:{
  //      flex: 1, alignItems: 'center', justifyContent: 'center'
  // },
  ortext:{
    marginRight: "auto",
    marginLeft: "auto",
    fontSize: 24
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    alignItems: "center",
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  flipButton: {
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  captureButton: {
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 180,
    marginVertical: 20,
    width: 75,
    height: 75,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
  caption: {
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.9,
    height: 50,
    borderRadius: 5,
    paddingLeft: 20,
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "black",
    color: "#fff",
  },
  headerButton: {
    // backgroundColor: 'black',
    marginRight: 20,
    height: 25,
    width: 25,
  },
  checkmark: {
    marginRight: "auto",
    marginLeft: "auto",
  },
});
export default Camer;
