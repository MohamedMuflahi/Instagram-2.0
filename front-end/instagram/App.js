import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './screens/Home'
import Post from './screens/Post'
import Account from './screens/Account'
import Login from './screens/Login'
import SearchScreen from './screens/SearchScreen'
import Camer from './components/Camer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-redux";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "./redux/user";

const Tab = createBottomTabNavigator();

function PlaceHolder(){
  const currentUser = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser.id);
  // console.log(!!currentUser.id)
  const [token, setToken] = useState('');
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        setToken(value);
        // console.log(value);
      }
    } catch(e) {
      // error reading value
    }
  }
  function fetchProfile() {
    
    fetch("http://10.129.2.181:3000/profile", {
      headers: { Authentication: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        dispatch(setValue(result));
      });
  }
  useEffect(() => {
    getData();
    //fetchProfile();
  }, [token])
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };
  return(
    <>
      {!!currentUser.id? <NavigationContainer  theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            //console.log(color,size);
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }else if (route.name === 'Post'){
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }else if(route.name === 'Search'){
              iconName = focused ? 'search' : 'search';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ title: 'Home' , headerShown: false,
    headerTransparent: true, 
        }}/>
        
        <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Search' , headerShown: false,
    headerTransparent: true, 
        }}/>
        <Tab.Screen name="Post" component={Camer} options={{ title: 'Post' , headerShown: false,
    headerTransparent: true, 
        }}/>
        <Tab.Screen name="Account" component={Account} options={{ title: 'Account' , headerShown: false,
    headerTransparent: true, 
        }}/>
      </Tab.Navigator>
    </NavigationContainer>: <Login/>}
    </>
  )
}
export default function App() {
  
  return (
    <Provider store={store}>
      <PlaceHolder/>
    </Provider>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 40,
  }
})