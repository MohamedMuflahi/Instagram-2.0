import React, {useState} from 'react';
import { Text, View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function PostCard({item, navigation,handleComment,handleOpenLikes}){
    // console.log(item)
    const [isLiked, setIsLiked] = useState(false);
    function handleLike(){
        if (isLiked){   
            setIsLiked(false)
            item.likes_count --;
        }else{
            setIsLiked(true)
            item.likes_count ++;
        }
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
        // console.log("userID", item.user.id)
        navigation.navigate("UserProfile", { user_id: item.user.id})
    }
    function DaysAgo(){
        //2022-05-12T01:22:24.961Z
        let x = item.created_at
        // x.split('T')
        return x
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
                <View style={styles.hashtagView}>
                    {item.tags.map(item=>{
                        return(
                            <Text style={styles.hashtagText}>#{item.name}</Text>
                        )
                    })}
                </View>
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
                <Text style={styles.date}>{item.created_at.split('T')[0]}</Text>
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
        fontSize: 12,
        color: 'black',
        fontWeight:"bold",
        marginLeft: 10
    },
    captionText:{
        fontSize: 12,
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
        marginVertical: 10,
        height: 20,
    },
    secondLogo:{
        width: 25,
        height: 25,
        borderRadius: 180,
        marginLeft: 10,
    },counter:{
        fontSize:12,
        marginHorizontal: 10,
    },hashtagView:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:2,
    },
    hashtagText:{
        fontSize:12,
        color: 'rgba(0, 200, 252,1)',
        marginLeft: 10,
    },

})
export default PostCard