import React, { useState, useEffect } from "react";
import {
  Text,
  RefreshControl,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCard from "../components/PostCard";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import * as FaceDetector from "expo-face-detector";
const Stack = createStackNavigator();
function Account() {
  const dispatch = useDispatch();
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
    wait(1000).then(() => {
      GetPostData(currentUser.id);
    });
  }, []);
  useEffect(() => {
    GetPostData(currentUser.id);
  }, []);
  function GetPostData(id) {
    fetch(`http://192.168.1.7:3000/user/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
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
            <TouchableOpacity
              style={styles.textView}
              onPress={() => navigation.navigate("Followers")}
            >
              <Text style={styles.centerText}>
                {currentUser.follower_count}
              </Text>
              <Text style={styles.centerText}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textView}
              onPress={() => navigation.navigate("Following")}
            >
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
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("Posts")}
            >
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
  function Comments({ route }) {
    const { post_id } = route.params;
    const [commentsArray, setCommentsArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/comments/${post_id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setCommentsArray(data);
        });
    }, []);
    return (
      <FlatList
        data={commentsArray}
        renderItem={({ item }) => <CommentCard item={item}></CommentCard>}
        keyExtractor={(item) => item.id}
      />
    );
  }
  function CommentCard({ item }) {
    console.log(item);
    return (
      <View style={styles.cardView}>
        <Image
          style={styles.commentLogo}
          source={{ uri: item.user.avatar_url }}
        />
        <Text>
          <Text style={styles.usernameText}>{item.user.username}</Text>
          <Text style={styles.commentText}> {item.content}</Text>
        </Text>
      </View>
    );
  }
  function Likes({ route }) {
    const { post_id } = route.params;
    const [likeArray, setLikeArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/likes/${post_id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setLikeArray(data);
        });
    }, []);

    return (
      <FlatList
        data={likeArray}
        renderItem={({ item }) => <LikeCard item={item}></LikeCard>}
        keyExtractor={(item) => item.id}
      />
    );
  }
  function LikeCard({ item }) {
    return (
      <View style={styles.cardView}>
        <Image
          style={styles.commentLogo}
          source={{ uri: item.user.avatar_url }}
        />
        <Text>
          <Text style={styles.usernameText}>{item.user.username}</Text>
        </Text>
      </View>
    );
  }
  function FollowersPage({ navigation }) {
    const [followersArray, setFollowersArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/followers/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setFollowersArray(data);
        });
    }, []);
    function FollowerCard({ item }) {
      return (
        <View style={styles.cardView}>
          <Image style={styles.commentLogo} source={{ uri: item.avatar_url }} />
          <Text>
            <Text style={styles.usernameText}>{item.username}</Text>
          </Text>
        </View>
      );
    }
    return (
      <>
        {followersArray.length > 0 ? (
          <FlatList
            style={styles.list}
            data={followersArray}
            renderItem={({ item }) => (
              <FollowerCard item={item} navigation={navigation}></FollowerCard>
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text style={styles.EmptyText}>No Followers :C</Text>
        )}
      </>
    );
  }
  function FollowingsPage({ navigation }) {
    const [followingArray, setFollowingArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/following/${currentUser.id}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          setFollowingArray(data);
        });
    }, []);
    function FollowingCard({ item }) {
      return (
        <View style={styles.cardView}>
          <Image style={styles.commentLogo} source={{ uri: item.avatar_url }} />
          <Text>
            <Text style={styles.usernameText}>{item.username}</Text>
          </Text>
        </View>
      );
    }
    return (
      <>
        {followingArray.length > 0 ? (
          <FlatList
            style={styles.list}
            data={followingArray}
            renderItem={({ item }) => (
              <FollowingCard
                item={item}
                navigation={navigation}
              ></FollowingCard>
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text style={styles.EmptyText}>
            You Are Not Following Anyone! Go make Some Friends Loser!
          </Text>
        )}
      </>
    );
  }
  function PostsView({ navigation }) {
    function handleComment(id) {
      navigation.navigate("AccountComments", {
        post_id: id,
      });
    }
    function handleOpenLikes(id) {
      navigation.navigate("AccountLikes", {
        post_id: id,
      });
    }
    return (
      <FlatList
        style={styles.list}
        data={postsArray}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            navigation={navigation}
            handleComment={handleComment}
            handleOpenLikes={handleOpenLikes}
          ></PostCard>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  }
  function AccountSetting({ navigation }) {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    function handleChangeDetails() {
      fetch("http://192.168.1.7:3000/user/update", {
        method: "POST",
        body: JSON.stringify({
          user_id: currentUser.id,
          username,
          bio,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          navigation.navigate("page");
        });
    }
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("editprofile")}>
            <Image
              style={styles.logoEdit}
              source={{ uri: currentUser.avatar_url }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="rgb(0, 0, 0)"
          />
          <TextInput
            style={styles.input}
            onChangeText={setBio}
            value={bio}
            placeholder="Bio"
            placeholderTextColor="rgb(0, 0, 0)"
          />
        </View>
        <TouchableOpacity
          style={styles.checkmark}
          onPress={() => handleChangeDetails()}
        >
          <Ionicons name="ios-checkmark" size={50} color="rgb(72,145,235)" />
        </TouchableOpacity>
      </View>
    );
  }
  function SubmitScreen({ navigation, route }) {
    const currentUser = useSelector((state) => state.user.value);
    const { image } = route.params;
    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("avatar", { uri: localUri, name: filename, type });
    formData.append("user_id", currentUser.id);
    function handleSubmit() {
      // console.log('clicked')
      fetch("http://192.168.1.7:3000/user/updateAvatar", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          navigation.navigate("page");
        });
    }
    return (
      <View>
        <Image style={styles.circleImage} source={{ uri: image.uri }} />
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.checkmark2}
        >
          <Ionicons name="ios-checkmark" size={50} color="rgb(72,145,235)" />
        </TouchableOpacity>
      </View>
    );
  }
  function EditProfile({ navigation }) {
    const isFocused = useIsFocused();
    const [hasPermission, setHasPermission] = useState(null);
    const [isSmiling, setIsSmiling] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    let camera;
    const takePicture = () => {
      if (camera) {
        camera.takePictureAsync({ onPictureSaved: onPictureSaved });
      }
    };

    const onPictureSaved = (photo) => {
      navigation.navigate("submitscreen", {
        image: photo,
      });
      // here we will do the magic after it saves the photo
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
    function handleFacesDetected({ faces, image }) {
      if(faces.length > 0){
        if(faces[0].smilingProbability > 0.5){
          setIsSmiling(true)
        }
      }
      // console.log(image);
    }
    return (
      <View style={styles.container}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
          >
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
        )}

        {isSmiling? <TouchableOpacity
          style={styles.captureButton}
          onPress={() => {
            takePicture();
          }}
        >
          <Ionicons name="ios-stop-circle-outline" size={75} color="black" />
          {/* ios-stop-circle-outline */}
        </TouchableOpacity>: null}
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
        options={{ title: "Edit Profile", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="Followers" component={FollowersPage} />
      <Stack.Screen name="Following" component={FollowingsPage} />
      <Stack.Screen name="Posts" component={PostsView} />
      <Stack.Screen
        name="AccountLikes"
        component={Likes}
        options={{ title: "Likes" }}
      />
      <Stack.Screen
        name="AccountComments"
        component={Comments}
        options={{ title: "Comments" }}
      />
      <Stack.Screen
        name="editprofile"
        component={EditProfile}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="submitscreen"
        component={SubmitScreen}
        options={{ title: "" }}
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
  },
 
});
export default Account;
