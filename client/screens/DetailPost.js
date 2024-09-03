import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, TextInput, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CommentBubble from '../components/CommentBubble';
import * as SecureStore from "expo-secure-store";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";

// const screenHeight = Dimensions.get('window').height;
// const remainingHeight = screenHeight - 555;

function DetailScreen({ navigation, route }) {
    if (!route.params) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Please select some post at Home Page</Text>
            </View>
        );
    }
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [route.params._id])
    );

    const [content, setContent] = useState("");
    const [username, setUsername] = useState();

    useEffect(() => {
        SecureStore.getItemAsync("username").then((res) => {
            setUsername(res);
        });
    }, []);

    const GET_USER_BY_ID = gql`
    query GetUserById($id: String) {
  getUserById(_id: $id) {
    _id
    name
    username
    email
    password
    following {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    followingDetail {
      _id
      name
      username
      email
    }
    follower {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
    followerDetail {
      _id
      name
      username
      email
    }
  }
}
`;
    const ADD_COMMENT = gql`
    mutation AddComment($idPost: String, $content: String, $username: String) {
  addComment(idPost: $idPost, content: $content, username: $username) {
    content
    username
    createdAt
    updatedAt
  }
}
`;
    const { loading, error, data, refetch } = useQuery(GET_POSTS_BY_ID, {
        variables: { id: route.params._id },
    });
    useEffect(() => {
        refetch();
    }, [route.params._id]);

    const [postFunction, { loading: addCommentLoading }] = useMutation(
        ADD_COMMENT,
        {
            refetchQueries: [
                {
                    query: GET_POSTS_BY_ID,
                    variables: { id: route.params._id },
                },
            ],
        }
    );

    const handleSubmit = async () => {
        try {
            await postFunction({
                variables: { content, idPost: data.getPostById._id },
            });
            setContent("");
            navigation.navigate("Home")
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (

        <View style={styles.container} >
            <ScrollView>
                <View style={{ paddingTop: 40 }}>
                    <View style={styles.header}>
                        <View style={styles.row}>
                            <View style={{ flex: 1, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", gap: 20 }}>
                                <Image source={{ uri: `https://picsum.photos/700/700?random=${data.getUserById._id}` }} style={{ height: 40, width: 40, borderRadius: 20 }}
                                // 
                                />
                                <Text style={styles.user}>{data?.getPostById.author?.name ||
                                    data?.getPostById.author?.username}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.9}>
                        <Text style={styles.post}>
                            {data?.getPostById?.content}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            {data?.getPostById.tags &&
                                data?.getPostById.tags.map(
                                    (tag) => tag && <Text style={{ color: "#0a66c2" }}>#{tag}</Text>
                                )}
                        </View>
                        <Image style={styles.photo} source={{ uri: data?.getPostById?.imgUrl }} />
                    </TouchableOpacity>
                    <View style={styles.footer}>
                        <View style={styles.footerCount}>
                            <Text style={styles.textCount}>{data?.getPostById.likes.length} Like</Text>
                            <Text style={styles.textCount}>{data?.getPostById.comments.length} Comment</Text>
                        </View>
                        <View style={styles.footerMenu}>
                            <TouchableOpacity style={styles.button}>
                                <View style={styles.icon}>
                                    <AntDesign name='like2' size={20} color='#424040' />
                                </View>
                                <Text style={styles.text}>Like</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => commentInputRef.current.focus()}>
                                <View style={styles.icon}>
                                    <MaterialCommunityIcons name='comment-outline' size={20} color='#424040' />
                                </View>
                                <Text style={styles.text}>Comment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ minHeight: remainingHeight }}>
                    <View style={{ flex: 1, padding: 10 }}>
                        <FlatList
                            data={data?.getPostById.comments}
                            renderItem={({ item }) => <CommentBubble data={item} />}
                            keyExtractor={(item, i) => i}
                        />
                    </View>
                    <View style={{ bottom: 0, left: 0, right: 0, height: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 60, paddingHorizontal: 18, width: "100%", gap: 28, alignItems: "center", flexDirection: "row" }} >
                            <TextInput
                                onChangeText={setContent}
                                value={content}
                                style={styles.search}
                                placeholder="Write a comment..."
                                returnKeyType="input" />
                            <TouchableOpacity onPress={handleSubmit}>
                                <Ionicons name="send" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom: 10
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    user: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    post: {
        fontSize: 12,
        color: '#222121',
        lineHeight: 16,
        padding: 11,
    },
    photo: {
        marginTop: 9,
        width: '100%',
        height: 300,
    },
    footer: {
        padding: 11,
    },
    footerCount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 9,
    },
    textCount: {
        fontSize: 11,
        color: '#424040',
    },
    footerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 9,
    },
    button: {
        flexDirection: 'row',
    },
    icon: {
        marginRight: 6,
    },
    text: {
        fontSize: 12,
        color: '#424040',
    },
    bottomDivider: {
        width: '100%',
        height: 9,
        background: '#f0f2f5',
    },
    search: {
        height: 40,
        width: "80%",
        borderRadius: 30,
        backgroundColor: "white",
        borderColor: 'lightgray',
        borderWidth: 1,
        paddingHorizontal: 20,
    },
});


export default DetailScreen;