import React, { useState, useEffect, useTransition } from "react";
import { Dimensions } from "react-native";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import UserProfile from "../components/UserProfile";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Ionicons from "@expo/vector-icons/Ionicons";
function SearchScreen() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    fetch("http://10.129.2.181:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  const shownusers = users.filter(user=> user.username.includes(input))
  
  function SearchBar({navigation}){
      return(
        <View>
        <View style={styles.rowView}>
        <Ionicons  style={styles.SEARCHICON} name="search" size={25} color="black" />
          <TextInput
            style= {styles.textInput}
            onChangeText={setInput}
            value={input}
            placeholder="Search for a User"
            placeholderTextColor="rgba(0, 0, 0,0.5)"
          />
        </View>
          {shownusers.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={styles.cardView} onPress={() => navigation.navigate('userProfile',{
                  user_id: item.id
              })}>
                <Image
                  style={styles.commentLogo}
                  source={{ uri: item.avatar_url }}
                />
                <Text>
                  <Text style={styles.usernameText}>{item.username}</Text>
                  <Text style={styles.commentText}>  Bio: {item.bio}</Text>
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )
  }
  return (
    <Stack.Navigator>
    <Stack.Screen name='search' component={SearchBar}  options={{headerShown:  false }}/>
    <Stack.Screen name='userProfile' component={UserProfile} options={{headerTitle:  ""}} />
  </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
    scroll: {
      marginTop: 20,
    },
    mainView: {
      flex: 1,
      padding: 0,
    },
    userHeader: {
      marginLeft: 20,
      marginTop: 75,
    },
    userGallery: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 180,
    },
    rowView: {
      display: "flex",
      flexDirection: "row",
     alignItems:"center",
     marginTop: 40,
     backgroundColor: 'rgba(0,0,0,0.1)',
     width: Dimensions.get("window").width - 30,
     marginRight: "auto",
     marginLeft: "auto",
     borderRadius:10,
    },
    textView: {
      marginHorizontal: 20,
    },
    centerText: {
      textAlign: "center",
    },
    usernamText: {
      marginTop: 10,
    },
    bioText: {
      marginTop: 5,
      fontSize: 11,
      color: "gray",
    },
    galleryItem: {
      width: Dimensions.get("window").width / 3 - 5,
      height: Dimensions.get("window").width / 3 - 5,
      margin: 2,
    },
    headerButton: {
      position: "absolute",
      top: Dimensions.get("window").height / 20,
      right: Dimensions.get("window").width * 0.05,
      // width: ((Dimensions.get('window').width)/3)-5,
      // height:((Dimensions.get('window').width)/3)-5,
    },
    logoEdit: {
      width: 200,
      height: 200,
      borderRadius: 180,
      marginRight: "auto",
      marginLeft: "auto",
      marginVertical: 20,
    },
    cardView: {
      display: "flex",
      flexDirection: "row",
      marginLeft: 20,
      marginVertical: 15,
      maxWidth: Dimensions.get("window").width - 100,
      backgroundColor: "white",
      // width:  Dimensions.get("window").width,
    },
    commentLogo: {
      width: 40,
      height: 40,
      marginRight: 10,
      borderRadius: 90,
    },
    usernameText: {
      fontWeight: "bold",
    },
    commentText: {},
    EmptyText: {
      textAlign: "center",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "auto",
      marginBottom: "auto",
      fontSize: 18,
    },
    input: {
      width: "80%",
      height: "20%",
      borderRadius: 10,
      marginVertical: "2%",
      marginRight: "auto",
      marginLeft: "auto",
      textAlign: "center",
      color: "black",
      borderColor: "rgba(0,0,0,0.5)",
      borderWidth: 1,
    },
    checkmark: {
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 10,
    },
    checkmark2: {
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: 50,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row",
      margin: 20,
    },
    captureButton: {
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: 180,
      marginVertical: 20,
      width: 75,
      height: 75,
    },
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    button: {
      flex: 0.1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      color: "white",
    },
    circleImage: {
      width: 300,
      height: 300,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: 180,
    },
    btn: {
      width: Dimensions.get("window").width * 0.02,
    },textInput:{
        height: 50,
        marginLeft: 5,


    },SEARCHICON:{
        marginLeft: 5,
    },
   
  });
export default SearchScreen;
