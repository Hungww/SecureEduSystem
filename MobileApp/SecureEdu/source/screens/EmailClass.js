import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  FlatList,
  Modal
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Header2 from "../components/Header2";
import { set } from "firebase/database";



const EmailClass = () => {
    const [text, setText] = useState("Useless Text");
    const [gotScan, setGotScan] = useState(false);
    const [isFakelink, setIsFakelink] = useState(false);
    async function handleScan(inputUrl) {
        // handle scan
        try {
            const response = await fetch(
              "https://secureeduserver.onrender.com?target=" + inputUrl
            );
            const data = await response.json();
            console.log(data);
            setGotScan(true);
            setIsFakelink(data);
    
        
        }
    
        
        catch (error) {
            console.log(error);
        }
        }
    return (
        
        <SafeAreaView className="bg-[#FFFFFF] h-screen">
        <View className="flex flex-col  items-center h-screen ">
          <Header2 title="Email Check" />
          <TextInput className="rounded-2xl h-[20%] text-[#4a4949] mt-6 bg-[#F7F7F9] w-[90%] px-4"
          onChangeText={(text) => setText(text)}
          placeholder="Enter email content here..."
          textAlignVertical="center"
          
          >

            
          </TextInput>
          <TouchableOpacity
          className="
            flex flex-row items-center justify-center w-[35%] mt-[5%] bg-[#3D8FEF] h-12 rounded-lg
        "
          onPress={() => handleScan(text)}
        >
          <Text className="text-2xl font-medium text-center  text-white ">
            Check
          </Text>
        </TouchableOpacity>
        <View className="flex flex-col items-center mt-4">
          <Text className="text-2xl font-medium text-center  text-black ">
            {gotScan ? isFakelink ? "This email is spam" : "This email is not spam" : ""}
          </Text>
          </View>
        

        </View>
        </SafeAreaView>
    );
};

export default EmailClass;