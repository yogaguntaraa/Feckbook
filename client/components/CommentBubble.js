import React from 'react';
import { View, Text, Image } from 'react-native';

const CommentBubble = ({ data }) => {
    return (
        <View style={{ minHeight: 100, paddingVertical: 5 }}>
            <View style={{ flexDirection: "row", gap: 20 }}>
                <Image source={{ uri: `https://picsum.photos/700/700?random=${data._id}` }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                <View style={{ backgroundColor: "#E3E1D9", width: "70%", borderRadius: 18, paddingHorizontal: 5, justifyContent: "center" }}>
                    <Text style={{ paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10, fontWeight: 'bold' }}>{data?.name || data.username}</Text>
                    <Text style={{ paddingHorizontal: 15, paddingBottom: 15 }}>{data.content}</Text>
                </View>
            </View>
        </View>
    );
};

export default CommentBubble;