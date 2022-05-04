import React, {useState} from 'react';
import {StyleSheet,FlatList} from 'react-native';
import PostCard from '../components/PostCard'
function Home(){  
    let arr = [1,2,3];
    return (
        <FlatList style={styles.list} data={arr} renderItem={({item})=>(<PostCard></PostCard>)} keyExtractor={(item)=> item}/>
    );
}
const styles = StyleSheet.create({
    mainView:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
})
export default Home;