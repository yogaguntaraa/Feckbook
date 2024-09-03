import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome, Ionicons, MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";


export default function PostCard({ data, navigation, username, handleLike }) {
    const likesUsername = data.likes.map((user) => user.username);
    const [isLike, setIsLike] = useState(likesUsername.includes(username));
    const handleLikeClick = (postId) => {
        handleLike(postId);
        setIsLike(true);
    };
    return (
        <View>
            <View>
                <View style={styles.postContainer} >
                    <View style={styles.postHeader}>
                        <Image source={{ uri: `https://picsum.photos/700/700?random=${data.author._id}` }} style={styles.profileImage} />
                        <View style={styles.postInfo}>
                            <Text style={styles.username}>{data.author.username}</Text>
                        </View>
                        <MaterialIcons name="more-horiz" size={24} color="gray" />
                    </View>

                    <View style={styles.content}  >
                        <Text >{data.content}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        {data.tags &&
                            data.tags.map(
                                (tag) => tag && <Text style={{ color: "#0a66c2" }}>#{tag}</Text>
                            )}
                    </View>
                    <View>
                        <Image source={{ uri: data.imgUrl }} style={styles.postImage}
                        />
                    </View>
                    <View style={styles.footerMenu}>
                        <TouchableOpacity onPress={() => handleLikeClick(data._id)}>
                            {isLike ? (
                                <View style={{ alignItems: "center" }}>
                                    <AntDesign
                                        style={{ transform: "scaleX(-1)" }}
                                        name="like1"
                                        size={16}
                                        color="#38434f"
                                    />
                                    <Text>{data.likes.length} like</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: "center" }}>
                                    <AntDesign
                                        style={{ transform: "scaleX(-1)" }}
                                        name="like2"
                                        size={16}
                                        color="#38434f"
                                    />
                                    <Text>{data.likes.length} Like</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={{ alignItems: "center" }}>
                            <Octicons
                                style={{ transform: "scaleX(-1)" }}
                                name="comment"
                                size={16}
                                color="#38434f"
                                onPress={() => navigation.navigate("Detail", { _id: data._id })}
                            />
                            <Text>{data.comments.length} Comment</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    footerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 9,
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
    }
    // container: {
    //     flex: 1,
    //     backgroundColor: '#f0f2f5',
    // },
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     padding: 10,
    //     backgroundColor: '#fff',
    // },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     color: '#3b5998',
    // },
    // headerIcons: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     width: 90,
    // },
    // inputContainer: {
    //     flexDirection: 'row',
    //     padding: 10,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     marginBottom: 10,
    // },
    // input: {
    //     flex: 1,
    //     padding: 10,
    //     backgroundColor: '#e4e6eb',
    //     borderRadius: 20,
    //     marginLeft: 10,
    // },,
});