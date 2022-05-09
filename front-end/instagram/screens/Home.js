import React, { useState, useEffect } from "react";
import { RefreshControl,StyleSheet, FlatList,Text,View,Image } from "react-native";
import PostCard from "../components/PostCard";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Dimensions } from "react-native";
import UserProfile from "../components/UserProfile";
const Stack = createStackNavigator();
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
function Home() {
  const currentUser = useSelector((state) => state.user.value);

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
    fetch("http://10.129.2.181:3000/feed")
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
    useEffect(() => {
      fetch(`http://10.129.2.181:3000/comments/${post_id}`)
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
    console.log(item)
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
    marginLeft: 20,
    marginVertical: 15,
    maxWidth:  Dimensions.get("window").width-100,
    backgroundColor: 'white'
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
  },
});
export default Home;
