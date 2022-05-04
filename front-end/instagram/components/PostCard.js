import * as React from 'react';
import { Text, View,StyleSheet,Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function PostCard(){
    return(
        <View style={styles.mainView}>
            <View style={styles.cardHeader}>
                {/* <Ionicons name={'home'} size={'25px'} color={'tomato'} />; */}
                <Image style={styles.logo} source={{uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQGdW2WTs_TnGA/profile-displayphoto-shrink_200_200/0/1649346505243?e=1656547200&v=beta&t=p-omFvx5_LZ4bu1XqEcofhpRtU-Yk6Ah6C1acLMthWU',}}/>
                <Text style={styles.cardName}>Mo.flahi</Text>
                <Ionicons style={styles.threeDots} name="ellipsis-horizontal" size={16} color="black"/>
            </View>
            <View>
                {/*  */}
                <Image style={styles.mainImage} source={{uri: 'https://cdn.vox-cdn.com/thumbor/RvcSv_hd-VrlfPg8Tl_JOfhoIoU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19534169/171109_08_11_37_5DS_0545__1_.jpg',}}/>
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.cardHeader}>
                <Ionicons name="heart-outline" size={16} color="black" style={styles.heartIcon}/>
                <Ionicons name="chatbubble-outline" size={16} color="black" style={styles.heartIcon}/>
                </View>
                <View style={styles.rowview}>
                <Text style={styles.userName}>Mo.flahi</Text>
                <Text style={styles.captionText}>This is my first Post ever!</Text>
                </View>
                <View style={styles.addCommentView}>
                    <Image style={styles.secondLogo} source={{uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQGdW2WTs_TnGA/profile-displayphoto-shrink_200_200/0/1649346505243?e=1656547200&v=beta&t=p-omFvx5_LZ4bu1XqEcofhpRtU-Yk6Ah6C1acLMthWU',}}/>
                    <Text style={styles.date}> Add a comment...</Text>
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
    },

})
export default PostCard