import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import {View,Text,ScrollView, TouchableOpacity} from "react-native";
import { Surface } from "gl-react-expo";
import ImageFilters from "react-native-gl-image-filters";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import Ionicons from "@expo/vector-icons/Ionicons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height/ 1.5;

function Instagram({route,navigation}) {
    const currentUser = useSelector((state) => state.user.value);
    const { photo } = route.params;
  const settings = [
    {
      name: "hue",
      minValue: 0,
      maxValue: 6.3,
    },
    {
      name: "blur",
      minValue: 0,
      maxValue: 30,
    },
    {
      name: "sepia",
      minValue: -5,
      maxValue: 5,
    },
    {
      name: "sharpen",
      minValue: 0,
      maxValue: 15,
    },
    {
      name: "negative",
      minValue: -2.0,
      maxValue: 2.0,
    },
    {
      name: "contrast",
      minValue: -10.0,
      maxValue: 10.0,
    },
    {
      name: "saturation",
      minValue: 0.0,
      maxValue: 2,
    },
    {
      name: "brightness",
      minValue: 0,
      maxValue: 5,
    },
    {
      name: "temperature",
      minValue: 0.0,
      maxValue: 40000.0,
    },
    {
      name: "exposure",
      minValue: -1.0,
      maxValue: 1.0,
      step: 0.05,
    },
  ];
  const [image, setImage] = useState({})
  const [preferences, setPreferences] = useState({
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
  });
  
function postImage(image,caption){
    
    let localUri = image;
    let filename = localUri.split("/").pop();
  
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });
    formData.append("caption", caption);
    formData.append("user_id", currentUser.id);
   // console.log(formData);
    fetch("http://10.129.2.181:3000/post", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // console.log(data)
          navigation.navigate("gallery")
        })
        .catch(error =>console.log(error))
  }
  const saveImage = async () => {
    if (!image) return;

    const result = await image.glView.capture();
    //console.log(result);
    postImage(result.uri,"wow");
  };
  return (
  <ScrollView>
        <Surface style={{ width:width, height: height }} ref={(ref) => setImage(ref)}>
          <ImageFilters {...preferences} width={width} height={height}>
            {{ uri: photo }}
          </ImageFilters>
        </Surface>
        <View  style={styles.filter}>
        {settings.map((filter) => (
          <Filter
            key={filter.name}
            name={filter.name}
            value={preferences[filter.name]}
            minimum={filter.minValue}
            maximum={filter.maxValue}
            step={filter.step}
            onChange={(value) => setPreferences({...preferences, [filter.name]: value })}
          />
        ))}
        </View>
        <TouchableOpacity style={styles.checkmark} ononPress={saveImage}>
          <Ionicons name="ios-checkmark" size={50} color="black" />
        </TouchableOpacity>
        
  </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: { marginTop: 20, marginHorizontal: 20 },
  button: { marginVertical: 20, borderRadius: 0 },
  filter:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkmark:{
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

export default Instagram;
