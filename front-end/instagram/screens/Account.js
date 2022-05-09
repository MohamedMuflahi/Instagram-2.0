import React, { useState, useEffect } from "react";
import {
  Text,
  RefreshControl,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCard from "../components/PostCard";
const Stack = createStackNavigator();
function Account() {
  //let {vw, vh, vmin, vmax} = require('react-native-viewport-units');
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const currentUser = useSelector((state) => state.user.value);
  const [postsArray, setPostsArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    // change this once i fix feed data
    setRefreshing(true);
    wait(1000).then(() => GetPostData());
  }, []);
  useEffect(() => {
    GetPostData();
  }, []);
  function GetPostData() {
    fetch(`http://10.129.2.181:3000/user/posts/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPostsArray(data);
        setRefreshing(false);
      });
  }
  
  function AccountPage({ navigation }) {
    return (
      <View style={styles.mainView}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("settings")}
            style={styles.headerButton}
          >
            <Ionicons name="cog" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.userHeader}>
          <View style={styles.rowView}>
            <Image
              style={styles.logo}
              source={{ uri: currentUser.avatar_url }}
            />
            <View style={styles.textView}>
              <Text style={styles.centerText}>{currentUser.post_count}</Text>
              <Text style={styles.centerText}>Posts</Text>
            </View>
            <TouchableOpacity style={styles.textView} onPress={()=>navigation.navigate("Followers")}>
              <Text style={styles.centerText}>
                {currentUser.follower_count}
              </Text>
              <Text style={styles.centerText}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textView} onPress={()=>navigation.navigate("Following")}>
              <Text style={styles.centerText}>
                {currentUser.following_count}
              </Text>
              <Text style={styles.centerText}>Following</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.usernamText}>{currentUser.username}</Text>
          <Text style={styles.bioText}>{currentUser.bio}</Text>
        </View>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.userGallery}
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {postsArray.map((item) => (
            <TouchableOpacity  key={item.id}onPress={() => navigation.navigate("Posts")}>
              <Image
              style={styles.galleryItem}
              source={{ uri: item.image_url }}
            />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
  function FollowersPage(){
    useEffect(() => {
      fetch(`http://10.129.2.181:3000/followers/${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    }, [])
    
    return(
      <Text>FOLLOWERS</Text>
    )
  }
  function FollowingsPage(){
    useEffect(() => {
      fetch(`http://10.129.2.181:3000/following/${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    }, [])
    
    return(
      <Text>FOLLOWING</Text>
    )
  }
  function PostsView({navigation}){
    return(
      <FlatList
        style={styles.list}
        data={postsArray}
        renderItem={({ item }) => <PostCard item={item} navigation={navigation}></PostCard>}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    )
  }
  function AccountSetting() {
    return (
      <View>
        <Image
          style={styles.logoEdit}
          source={{ uri: currentUser.avatar_url }}
        />
      </View>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="page"
        component={AccountPage}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="settings"
        component={AccountSetting}
        options={{ title: "Account Settings", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Followers" component={FollowersPage}/>
      <Stack.Screen name="Following" component={FollowingsPage}/>
      <Stack.Screen name="Posts" component={PostsView}/>
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
    alignItems: "center",
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
});
export default Account;
