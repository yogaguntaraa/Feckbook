import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts {
  getPosts {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    author {
      _id
      username
      name
      email
    }
  }
}
`;
const ADD_LIKE = gql`
  mutation AddLike($idPost: String) {
    addLike(idPost: $idPost) {
      username
      createdAt
      updatedAt
    }
  }
`;


const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{error.message}</Text>
      </View>
    );
  const [likeFunction] = useMutation(ADD_LIKE);

  const handleLike = async (idPost) => {
    try {
      await likeFunction({ variables: { idPost } });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Feckbook</Text>
          <View style={styles.headerIcons}>
            <Ionicons name="search" size={20} color="gray" />
            <FontAwesome name="bell" size={20} color="gray" />
            <AntDesign name="message1" size={20} color="gray" />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity >
            <Image source={{ uri: `https://picsum.photos/700/700?random=${data.id}` }} style={styles.profileImage}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            onPress={() => navigation.navigate("Post")}
          />
        </View>
        <View>
        <FlatList
          data={data?.getPosts}
          renderItem={({ item }) => (
            <PostCard
              navigation={navigation}
              data={item}
              // username={username}
              handleLike={handleLike}
            />
          )}
          keyExtractor={(item) => item._id}
        />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: '#424040',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b5998',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e4e6eb',
    borderRadius: 20,
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  footerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 9,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  content: {
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postFooterText: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;