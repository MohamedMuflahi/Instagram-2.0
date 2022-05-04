import React, {useState} from 'react';
import { Text, View,StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }
    function handleLogIn(){
        console.log("login")
        fetch("http://192.168.1.7:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
              console.log("logged in", data.token)
            storeData(data.token)
            dispatch(setValue(data.user));
          });
    }
    
  return (
      <>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(176,30,137,1)", " rgba(208,49,85,1)"]}
        style={styles.background}
      />
    <View style={styles.loginView}>
      <Text style={styles.InstagramText}>Instagram</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={()=>handleLogIn()}>
        <Text style={styles.centerText}>Log In</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.centerText}>Dont't have an account? Sign Up.</Text>
      </TouchableOpacity>
      </>
  );
}
const styles = StyleSheet.create({
    mainView:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    loginView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        
        // backgrounColor: rgb(176,30,137);
        // background: linear-gradient(90deg, rgba(176,30,137,1) 0%, rgba(208,49,85,1) 100%);
    },
    input:{
        marginBottom: 20,
        width: "90%",
        height: "7.5%",
        borderRadius: 5,
        paddingLeft: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "#fff"
    },
    loginButton:{
        width: "90%",
        height: "7.5%",
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)'
    },
    signUpButton:{
        marginTop: 'auto',
        marginBottom: 0,
        width: Dimensions.get('window').width+5,
        height: Dimensions.get('window').height *0.075,
        borderRadius: 5,
        textAlign: 'center',
        alignItems: 'center',justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    },
    InstagramText:{
        fontSize: 36,
        marginBottom: 30,
        color: "white",
    },
    centerText:{
        textAlign: 'center',
        color: "white",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get('window').height,
      },
})
export default Login