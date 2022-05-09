import React, {useState} from 'react';
import { Text, View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function PostCard({item, navigation,handleComment,handleOpenLikes}){
    // console.log(item)
    const [isLiked, setIsLiked] = useState(false);
    function handleLike(){
        setIsLiked(!isLiked);
    }
    // function handleComment(){
    //     navigation.navigate('Comments',{
    //         post_id: item.id
    //     })
    // }
    // function handleOpenLikes(){
    //     navigation.navigate('Likes',{
    //         post_id: item.id
    //     })
    // }
    function handleUserProfile(){
        console.log("userID", item.user.id)
        navigation.navigate("UserProfile", { user_id: item.user.id})
    }
    return(
        <View style={styles.mainView}>
            <TouchableOpacity style={styles.cardHeader} onPress={handleUserProfile}>
                {/* <Ionicons name={'home'} size={'25px'} color={'tomato'} />; */}
                <Image style={styles.logo} source={{uri: item.user.avatar_url}}/>
                <Text style={styles.cardName}>{item.user.username}</Text>
                <Ionicons style={styles.threeDots} name="ellipsis-horizontal" size={16} color="black"/>
            </TouchableOpacity>
            <View>
                {/*  */}
                <Image style={styles.mainImage} source={{uri: item.image_url}}/>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.cardHeader}>
                <TouchableOpacity onPress={()=>handleLike()}>
                    {isLiked? <Ionicons name="heart" size={24} color="red" style={styles.heartIcon}/> : <Ionicons name="heart-outline" size={24} color="black" style={styles.heartIcon}/>}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=>handleComment(item.id)}>
                    <Ionicons name="chatbubble-outline" size={24} color="black" style={styles.heartIcon}/>
                </TouchableOpacity>
                </View>
                <View style={styles.cardFooter}>
                <TouchableOpacity onPress={()=>handleOpenLikes(item.id)}>
                <Text style={styles.counter}>Liked by {item.likes_count}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleComment(item.id)}>
                <Text style={styles.counter}>View All {item.comments_count} Comments</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.rowview}>
                <Text style={styles.userName}>{item.user.username}</Text>
                <Text style={styles.captionText}>{item.caption}</Text>
                </View>
                <View style={styles.addCommentView}>
                    <Image style={styles.secondLogo} source={{uri: item.user.avatar_url}}/>
                    <TouchableOpacity onPress={()=>handleComment(item.id)}>
                    <Text style={styles.date}> Add a comment...</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.date}>3 days ago</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainView:{
        backgroundColor: 'white',
    },
    logo:{
        height: 35,
        width: 35,
        borderRadius: 180,
        marginLeft: 10,
    },
    mainImage:{
        width: '100%',
        height: 400,
    },
    cardHeader:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    cardFooter:{
        display: 'flex',
        flexDirection: 'column',
        // borderWidth: 1,
    },
    cardName:{
        marginLeft: 10,
        fontSize: 12,
    },
    threeDots:{
        marginLeft: 'auto',
        marginRight: 10
    },
    heartIcon:{
        marginLeft: 10,
    },
    date:{
        fontSize: 9,
        color: 'gray',
        marginLeft: 10
    },
    userName:{
        fontSize: 9,
        color: 'black',
        fontWeight:"bold",
        marginLeft: 10
    },
    captionText:{
        fontSize: 9,
        color: 'black',
        marginLeft: 2
    },
    rowview:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addCommentView:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    secondLogo:{
        width: 20,
        height: 20,
        borderRadius: 180,
        marginLeft: 10,
    },counter:{
        fontSize:10,
        marginHorizontal: 10,
    },

})
export default PostCard