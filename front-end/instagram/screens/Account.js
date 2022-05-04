import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native'
import { useSelector} from "react-redux";
function Account(){
    //let {vw, vh, vmin, vmax} = require('react-native-viewport-units');
    const currentUser = useSelector((state) => state.user.value);
    const [postsArray, setPostsArray] = useState([])
    useEffect(() => {
        fetch(`http://192.168.1.7:3000/user/posts/${currentUser.id}`)
        .then(res => res.json())
        .then(data =>{
            setPostsArray(data)
        })
    }, [])
    
    return (
        <View style={styles.mainView}>
        <View style={styles.userHeader}>
            <View style={styles.rowView}>
                <Image style={styles.logo} source={{uri: currentUser.avatar_url}}/>
                <View style={styles.textView}>
                <Text style={styles.centerText}>{currentUser.post_count}</Text>
                <Text style={styles.centerText}>Posts</Text>
                </View>
                <View style={styles.textView}>
                <Text style={styles.centerText}>{currentUser.follower_count}</Text>
                <Text style={styles.centerText}>Followers</Text>
                </View>
                <View style={styles.textView}>
                <Text style={styles.centerText}>{currentUser.following_count}</Text>
                <Text style={styles.centerText}>Following</Text>
                </View>
            </View>
            <Text style={styles.usernamText}>{currentUser.username}</Text>
            <Text style={styles.bioText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.userGallery} horizontal={false}>
    {postsArray.map((item) => (
    <Image key={item.id} style={styles.galleryItem} source={{uri: 'https://cdn.vox-cdn.com/thumbor/RvcSv_hd-VrlfPg8Tl_JOfhoIoU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19534169/171109_08_11_37_5DS_0545__1_.jpg',}}/>
    ))}
        </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    scroll:{
        marginTop: 20,
    },
    mainView:{
        flex: 1,
    },
    userHeader:{
        marginLeft: 20,
        marginTop: 75,
    },
    userGallery:{
        flexDirection: 'row', 
        flexWrap: 'wrap',
    },
    logo:{
        width:100,
        height:100,
        borderRadius:180,
    },
    rowView:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    textView:{
        marginHorizontal:20,
    },
    centerText:{
        textAlign: 'center'
    },
    usernamText:{
        marginTop:10,
    },
    bioText:{
        marginTop: 5,
        fontSize: 11,
        color: 'gray',
    },
    galleryItem:{
        width: ((Dimensions.get('window').width)/3)-5,
        height:((Dimensions.get('window').width)/3)-5,
        margin: 2,
    },
})
export default Account;