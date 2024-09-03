import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

function PostScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ height: 100, paddingHorizontal: 18, paddingTop: 30, width: "100%", gap: 28, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }} >
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>Create Post</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: "#3b5998", borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "700", padding: 12, color: "white" }}>Post</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ paddingHorizontal: 18 }}>
                <TextInput
                    style={{ height: 200, backgroundColor: "#f0f0f0", borderRadius: 10, padding: 10, textAlignVertical: "top" }}
                    placeholder="What's on your mind?"
                    multiline
                    numberOfLines={10}
                />
                <TextInput
                    style={{ marginTop: 10, backgroundColor: "#f0f0f0", borderRadius: 10, padding: 10 }}
                    placeholder="Tags"
                />
                <TextInput
                    style={{ marginTop: 10, backgroundColor: "#f0f0f0", borderRadius: 10, padding: 10 }}
                    placeholder="Image URL"
                />
            </ScrollView>
        </View >
    );
}

export default PostScreen;