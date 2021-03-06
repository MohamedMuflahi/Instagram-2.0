import React, {useState} from 'react';
import { Text, View,StyleSheet, TextInput, TouchableOpacity,Image,Alert } from 'react-native';
import { Dimensions } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import Ionicons from "@expo/vector-icons/Ionicons";

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLogin,setIsLogin] = useState(true);
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
          // saving error
        }
      }
      function handleSignUp(){
          //console.log(password)
          if(password === passwordConfirmation){
            fetch("http://192.168.1.7:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            bio: "Go to User Settings to add a BIO"
          }),
        })
          .then((response) => response.json())
          .then((data) => {
              // console.log("logged in", data.token)
              if(data.message){
                Alert.alert(
                  `${data.message}`,
                  "Please Try Again",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }else{
                storeData(data.token)
                dispatch(setValue(data.user));
              }
            
          });
          }else{
            Alert.alert(
              "Passwords Don't Match",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }
      }
    function handleLogIn(){
        // console.log("login")
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
              // console.log("logged in", data.token)
              if(data.message){
                Alert.alert(
                  `${data.message}`,
                  "Please Try Again",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
              }else{
                storeData(data.token)
            dispatch(setValue(data.user));
              }
            
          });
    }
    
  return (
      <>
      {isLogin? <>
        <LinearGradient
        // Background Linear Gradient
        colors={["rgba(176,30,137,1)", " rgba(208,49,85,1)"]}
        style={styles.background}
      />
    <View style={styles.loginView}> 
    {/* logo-instagram */}
    <Ionicons  style={styles.instaLogo} name="logo-instagram" size={150} color="white" />
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
    <TouchableOpacity onPress={()=>setIsLogin(false)} style={styles.signUpButton}>
        <Text style={styles.centerText}>Dont't have an account? Sign Up.</Text>
      </TouchableOpacity>
      </>: <>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(176,30,137,1)", " rgba(208,49,85,1)"]}
        style={styles.background}
      />
    <View style={styles.loginView}> 
    {/* logo-instagram */}
    <Ionicons  style={styles.instaLogo} name="logo-instagram" size={150} color="white" />
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
      <TextInput
        style={styles.input}
        onChangeText={setPasswordConfirmation}
        value={passwordConfirmation}
        placeholder="Confirm Password"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={()=>handleSignUp()}>
        <Text style={styles.centerText}>Sign up</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>setIsLogin(true)} style={styles.signUpButton}>
        <Text style={styles.centerText}>Have an account? Log in</Text>
      </TouchableOpacity>
      </>}
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
        // fontSize: 36,
        // marginBottom: 30,
        // color: "white",
        width:300, height: 90,
        marginVertical:20,
    },
    instaLogo:{
      marginBottom: 50,
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