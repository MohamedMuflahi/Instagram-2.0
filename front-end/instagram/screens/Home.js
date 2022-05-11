import React, { useState, useEffect } from "react";
import { RefreshControl,StyleSheet, FlatList,Text,View,Image,TextInput,TouchableOpacity } from "react-native";
import PostCard from "../components/PostCard";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import UserProfile from "../components/UserProfile";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
function Home() {
  const currentUser = useSelector((state) => state.user.value);
  console.log(currentUser)
  const [feedArray, setFeedArray] = useState([]);
 
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
      // change this once i fix feed data
    setRefreshing(true);
    wait(1000).then(() => FetchFeed());
  }, []);
  useEffect(() => {
    FetchFeed();
  }, []);
  function FetchFeed(){
    fetch("http://10.129.2.181:3000/feed/1")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFeedArray(data);
        setRefreshing(false)
      });
  }
  
  function Comments({route}){
    const { post_id } = route.params;
    const [commentsArray, setCommentsArray] = useState([]);
    const [commentInput, setCommentInput] = useState('')
    
    function handlePostComment(){
      // :user_id, :post_id,:content
      fetch("http://10.129.2.181:3000/comment", {
          method: "POST",
          body: JSON.stringify({
            user_id: currentUser.id,
            post_id: post_id,
            content: commentInput,
          }),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCommentsArray([...commentsArray,data]);
            setCommentInput('');
          });
    }
    useEffect(() => {
      fetch(`http://10.129.2.181:3000/comments/${post_id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setCommentsArray(data);
      });
    }, [])
    return(
      <>
      <FlatList
      data={commentsArray}
      renderItem={({ item }) => <CommentCard item={item} ></CommentCard>}
      keyExtractor={(item) => item.id}
    />
    <View style={styles.addCommentView}>
    <Image style={styles.addCommentUser} source={{uri: currentUser.avatar_url}}/>
    <TextInput 
            style={styles.addCommentInput}
            onChangeText={setCommentInput}
            value={commentInput}
            placeholder="Add a comment..."
            placeholderTextColor="rgba(0, 0, 0,0.5)"
          />
          <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
          <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
    </View>
      </>
      
    )
  }
  function CommentCard({item}){
    const [isliked, setIsliked] = useState(false);
    console.log(item)
    return(
      <View style={styles.cardView}>
        <Image style={styles.commentLogo} source={{uri: item.user.avatar_url}}/>
        <Text>
        <Text style={styles.usernameText}>{item.user.username}</Text>
        <Text style={styles.commentText}> {item.content}</Text>
        </Text>
        <TouchableOpacity style={styles.heartComment} onPress={()=>setIsliked(!isliked)}>
          {isliked? <Ionicons  name="heart" size={15} color="red"/>: <Ionicons  name="heart-outline" size={15} color="black"/>}
        </TouchableOpacity>
      </View>
    )
  }
  function Likes({route}){
    const { post_id } = route.params;
    const [likeArray, setLikeArray] = useState([])
    useEffect(() => {
      fetch(`http://10.129.2.181:3000/likes/${post_id}`)
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
  function CreateCards({ navigation}){
    function handleComment(id){
      navigation.navigate('Comments',{
          post_id: id
      })
  }
  function handleOpenLikes(id){
      navigation.navigate('Likes',{
          post_id: id
      })
  }
    return (
      <FlatList
        style={styles.list}
        data={feedArray}
        renderItem={({ item }) => <PostCard item={item} handleComment={handleComment} handleOpenLikes={handleOpenLikes} navigation={navigation}></PostCard>}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    )
  }
  
  return (
    <Stack.Navigator>
      <Stack.Screen name='cards' component={CreateCards}  options={{headerTitle:  "Instagram" }}/>
      <Stack.Screen name='Comments' component={Comments}/>
      <Stack.Screen name='Likes' component={Likes}/>
      <Stack.Screen name='UserProfile' component={UserProfile} options={{headerTitle:  ""}} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white'
  },
  cardView: {
    display: "flex",
    flexDirection: "row",
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 15,
    width:  Dimensions.get("window").width-20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    // width:  Dimensions.get("window").width,
  },
  commentLogo:{
    width:40, height: 40,
    marginRight: 10,
  },
  usernameText:{
    fontWeight:'bold',
    
  },
  commentText:{

  },InstaLogo:{
    height: 50,
    width: 50,
  },heartComment:{
    marginLeft: "auto",
    marginRight: 0,
    alignSelf: "center",
  },addCommentView:{
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical:10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.2)",
    paddingTop:10,
    // paddingHorizontal: 10,
  },addCommentInput:{
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 300,
    height:50,
    paddingLeft: 20,
  },addCommentUser:{
    // backgroundColor:"red",
    marginLeft:10,    //alignSelf: "flex-start",
    width:50, height: 50,
  },
  postText:{
    color:"darkcyan"
  },
  postButton:{ 
    marginLeft: 10,
  },
});
export default Home;
