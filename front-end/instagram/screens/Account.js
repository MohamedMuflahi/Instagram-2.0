import React, { useState, useEffect } from "react";
import {
  Text,
  RefreshControl,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    fetch(`http://192.168.1.7:3000/user/posts/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
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
            <View style={styles.textView}>
              <Text style={styles.centerText}>
                {currentUser.follower_count}
              </Text>
              <Text style={styles.centerText}>Followers</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.centerText}>
                {currentUser.following_count}
              </Text>
              <Text style={styles.centerText}>Following</Text>
            </View>
          </View>
          <Text style={styles.usernamText}>{currentUser.username}</Text>
          <Text style={styles.bioText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
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
            <Image
              key={item.id}
              style={styles.galleryItem}
              source={{ uri: item.image_url }}
            />
          ))}
        </ScrollView>
      </View>
    );
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
