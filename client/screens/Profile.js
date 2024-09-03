import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import AuthContext from '../App'
import * as SecureStore from 'expo-secure-store';
import { gql, useQuery } from '@apollo/client';


export const GET_USER_BY_ID = gql`
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


const ProfileScreen = ({ navigation, route }) => {
    const [id, setId] = useState("");
    // const { setIsSignedIn } = useContext(AuthContext)
    const {
        loading: loadingCurrentUser,
        error: errorCurrentUser,
        data: dataCurrentUser,
        // refetch: refetchCurrentUser,
    } = useQuery(GET_USER_BY_ID, {
        variables: { id },
    });

    const {
        loading: loadingOtherUser,
        error: errorOtherUser,
        data: dataOtherUser,
        refetch: refetchOtherUser,
    } = useQuery(GET_USER_BY_ID, {
        variables: { id: route.params?._id },
        skip: !route.params,
    });

    useEffect(() => {
        SecureStore.getItemAsync("userId").then((res) => {
            setId(res);
        });
    }, []);

    const loading = loadingCurrentUser || loadingOtherUser;
    const error = errorCurrentUser || errorOtherUser;
    const data = dataOtherUser || dataCurrentUser;

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
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.coverPhoto}>
                    <Image
                        source={{ uri: `https://picsum.photos/700/700?random=${data.getUserById.password}` }}
                        style={styles.coverImage}
                    />
                </View>
                <View style={styles.profileInfoContainer}>
                    <Image
                        source={{ uri: `https://picsum.photos/700/700?random=${data.getUserById._id}` }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileDetails}>
                        <Text style={styles.profileUsername}>{data.getUserById.username}</Text>
                        <Text style={styles.profileName}>{data.getUserById.name}</Text>
                        <Text style={styles.profileEmail}>{data.getUserById.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={async () => {
                        await SecureStore.deleteItemAsync("accessToken");
                        console.log("accessToken")
                        navigation.navigate("Login")
                    }}>
                        <MaterialIcons name="logout" size={24} color="#bd0000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search username here..."
                    // value={searchText}
                    // onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabButtonText}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabButtonText}>Your Followers</Text>
                </TouchableOpacity>
            </View>

            {/* <FlatList
                data={followings}
                renderItem={renderFollowingItem}
                keyExtractor={(item) => item.id}
                style={styles.followingList}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    coverPhoto: {
        height: 150,
        backgroundColor: '#ccc',
    },
    coverImage: {
        width: '100%',
        height: '150%',
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    profileDetails: {
        flex: 1,
        marginLeft: 20,
    },
    profileUsername: {
        fontSize: 24,
        fontWeight: '#fff',
        fontWeight: 'bold',
        color: "#fff"
    },
    profileEmail: {
        fontSize: 14,
        color: 'white',
    },
    profileName: {
        fontSize: 14,
        color: 'white',
    },
    logoutButton: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 30
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#e4e6eb',
        borderRadius: 20,
    },
    searchButton: {
        padding: 10,
        marginLeft: 10,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    followingList: {
        paddingHorizontal: 10,
    },
    followingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    followingAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    followingInfo: {
        flex: 1,
        marginLeft: 10,
    },
    followingName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    followingMutual: {
        fontSize: 14,
        color: 'gray',
    },
    removeButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#f00',
        borderRadius: 20,
    },
    removeButtonText: {
        color: '#fff',
    },
});

export default ProfileScreen;
