import React, { useState, useEffect } from "react";
import { RefreshControl,StyleSheet, FlatList } from "react-native";
import PostCard from "../components/PostCard";
const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
function Home() {
  const [feedArray, setFeedArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
      // change this once i fix feed data
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  useEffect(() => {
    fetch("http://192.168.1.7:3000/feed")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedArray(data);
      });
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={feedArray}
      renderItem={({ item }) => <PostCard item={item}></PostCard>}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
