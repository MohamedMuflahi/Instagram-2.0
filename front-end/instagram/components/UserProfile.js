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
import { useSelector,useDispatch } from "react-redux";
import { setValue } from "../redux/user";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCard from "../components/PostCard";
const Stack = createStackNavigator();

function UserProfile({route}) {
  const currentUser = useSelector((state) => state.user.value);

    const {user_id} = route.params;
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  const [postsArray, setPostsArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [user,setUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false)
    
  const onRefresh = React.useCallback(() => {
    // change this once i fix feed data
    setRefreshing(true);
    wait(1000).then(() => GetPostData());
  }, []);
  function getUser(){
    fetch(`http://192.168.1.7:3000/user/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      GetPostData();
      setUser(data)
    });
  }
  useEffect(() => {
    getUser();
    CheckFollowed();
  }, []);
  function GetPostData() {
    fetch(`http://192.168.1.7:3000/user/posts/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setPostsArray(data);
        setRefreshing(false);
      });
  }
  function CheckFollowed(){
    currentUser.following_id.forEach((e)=>{
      if(user_id === e){
        setIsFollowed(true);
      }
    })
  }
  function handleUnfollow(){
    fetch("http://192.168.1.7:3000/unfollow", {
      method: "POST",
      body: JSON.stringify({
        user_id: currentUser.id,
        followee_id: user_id
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setIsFollowed(false);
      })
  }
  function handlefollow(){
    fetch("http://192.168.1.7:3000/follow", {
      method: "POST",
      body: JSON.stringify({
        follower_id: currentUser.id,
        followee_id: user_id
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setIsFollowed(true);
      })
  }
  function AccountPage({ navigation }) {
    return (
      <View style={styles.mainView}>
        <View style={styles.userHeader}>
          <View style={styles.rowView}>
            <Image
              style={styles.logo}
              source={{ uri: user.avatar_url }}
            />
            <View style={styles.textView}>
              <Text style={styles.centerText}>{user.post_count}</Text>
              <Text style={styles.centerText}>Posts</Text>
            </View>
            <TouchableOpacity
              style={styles.textView}
              onPress={() => navigation.navigate("Followers")}
            >
              <Text style={styles.centerText}>
                {user.follower_count}
              </Text>
              <Text style={styles.centerText}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textView}
              onPress={() => navigation.navigate("Following")}
            >
              <Text style={styles.centerText}>
                {user.following_count}
              </Text>
              <Text style={styles.centerText}>Following</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.usernamText}>{user.username}</Text>
          <Text style={styles.bioText}>{user.bio}</Text>
          {isFollowed? <TouchableOpacity onPress={handleUnfollow} style={styles.appButtonContainer2}>
            <Text style={styles.appButtonText2}>Unfollow</Text>
          </TouchableOpacity> : <TouchableOpacity onPress={handlefollow} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Follow</Text>
          </TouchableOpacity>}
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
  function Comments({route}){
    const { post_id } = route.params;
    const [commentsArray, setCommentsArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/comments/${post_id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCommentsArray(data);
      });
    }, [])
    return(
      <FlatList
      data={commentsArray}
      renderItem={({ item }) => <CommentCard item={item} ></CommentCard>}
      keyExtractor={(item) => item.id}
    />
      
    )
  }
  function CommentCard({item}){
    // console.log(item)
    return(
      <View style={styles.cardView}>
        <Image style={styles.commentLogo} source={{uri: item.user.avatar_url}}/>
        <Text>
        <Text style={styles.usernameText}>{item.user.username}</Text>
      <Text style={styles.commentText}> {item.content}</Text>
        </Text>
      </View>
    )
  }
  function Likes({route}){
    const { post_id } = route.params;
    const [likeArray, setLikeArray] = useState([])
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/likes/${post_id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setLikeArray(data);
      });
    }, [])
    
    return(
      <FlatList
      data={likeArray}
      renderItem={({ item }) => <LikeCard item={item}></LikeCard>}
      keyExtractor={(item) => item.id}
    />
      
    )
  }
  function LikeCard({item}){
    return(
      <View style={styles.cardView}>
        <Image style={styles.commentLogo} source={{uri: item.user.avatar_url}}/>
        <Text>
        <Text style={styles.usernameText}>{item.user.username}</Text>
        </Text>
      </View>
    )
  }
  function FollowersPage({ navigation }) {
    const [followersArray, setFollowersArray] = useState([]);
    useEffect(() => {
      fetch(`http://192.168.1.7:3000/followers/${user_id}`)
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
      fetch(`http://192.168.1.7:3000/following/${user_id}`)
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
          <Text style={styles.EmptyText}>You Are Not Following Anyone! Go make Some Friends Loser!</Text>
        )}
      </>
    );
  }
  function PostsView({ navigation }) {
    function handleComment(id){
      navigation.navigate("AccountComments",{
        post_id: id
    })
    }
    function handleOpenLikes(id){
    navigation.navigate("AccountLikes",{
      post_id: id
  })
    }
    return (
      <FlatList
        style={styles.list}
        data={postsArray}
        renderItem={({ item }) => (
          <PostCard item={item} navigation={navigation} handleComment={handleComment} handleOpenLikes={handleOpenLikes}></PostCard>
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="page"
        component={AccountPage}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen name="Followers" component={FollowersPage} />
      <Stack.Screen name="Following" component={FollowingsPage} />
      <Stack.Screen name="Posts" component={PostsView} options={{ title: "", headerShown: false}}/>
      <Stack.Screen name="AccountLikes" component={Likes} options={{ title: "", headerShown: false}}/>
      <Stack.Screen name="AccountComments" component={Comments} options={{ title: "", headerShown: false}}/>
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
    marginTop: 20,
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
  EmptyText:{
    textAlign:"center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 18,

  }, appButtonContainer: {
    elevation: 8,
    backgroundColor: "#2196f3",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    width: 100,
  },
  appButtonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonContainer2: {
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    width: 100,
  },
  appButtonText2: {
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
export default UserProfile;
