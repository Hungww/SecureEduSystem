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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import Header2 from "../components/Header2";
import { set } from "firebase/database";
const UrlCheck = () => {
  async function handleScan(inputUrl) {
    // handle scan
    try {
      const response = await fetch(
        "https://secureeduserver.onrender.com/api/v1/url_check?target=" + inputUrl
      );
      console.log(response);
      const data = await response.json();
      console.log(data.last_analysis_stats);
      setLast_analysis_stats(data.last_analysis_stats);

      console.log("RESSS", data.res);
      setIsFakelink(data.res);

      console.log(data.total_votes);
      setTotalVotes(data.total_votes);

      console.log(data.message);
      const concatallScan = data.malicious_results
        .concat(data.suspicious_results)
        .concat(data.harmless_results);
      console.log("Concat", concatallScan);
      setAllScan(concatallScan);

      setGotScan(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function jsonToText(json) {
    return JSON.stringify(json);
  }
  const [text, setText] = useState("Useless Text");
  const [gotScan, setGotScan] = useState(false);
  const [last_analysis_stats, setLast_analysis_stats] = useState({});
  const [allScan, setAllScan] = useState([]);
  const [totalVotes, setTotalVotes] = useState({});
  const [isFakelink, setIsFakelink] = useState(false);
  const Item = ({ item }) => (
    <View className="flex flex-row justify-between h-[60] mb-4 bg-white shadow-md items-center px-4 rounded-2xl">
      <Text>{item.engine_name}</Text>
      <Text
        className={
          item.category === "malicious"
            ? "text-[#cc3300]"
            : item.category === "suspicious"
            ? "text-[#ffcc00]"
            : "text-green-600"
        }
      >
        {item.category}
      </Text>
    </View>
  );
  function SummaryCircle() {
    return (
      <View className="flex flex-col h-[30%]  items-center w-[90%] "></View>
    );
  }
  function Summary() {
    if (!gotScan) {
      return <Text></Text>;
    } else {
      return (
        <View className="flex flex-col  items-center w-[90%] mt-[5%] ">
            <View className="flex flex-col  items-center w-[90%] mt-[5%] p-4 bg-white shadow-2xl rounded-xl" >
            <View className="w-[100%] flex-row items-center">
              <Text className="text-xl font-medium  text-[#3D8FEF] ">
                Scan database
                
                
              </Text> 
              {isFakelink && <Text className="ml-8 text-lg text-[#cc3300]">Can be fake</Text>}
              {!isFakelink && <Text className="ml-8 text-lg text-green-600">Authentic link</Text>}
            </View>
          <View className="w-[100%]">
            <Text className="text-xl font-medium  text-[#3D8FEF] ">
              Virus Total Summary
            </Text>
          </View>

          <View className="flex flex-row w-[80%] justify-between">
            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="green" />
              <Text className="text-green-600 ml-2">
                Harmless: {last_analysis_stats.harmless}
              </Text>
            </View>

            <View className="flex flex-row  items-center">
              <Octicons name="dot-fill" size={24} color="#ffcc00" />
              <Text className="text-[#ffcc00] ml-2">
                Suspicious: {last_analysis_stats.suspicious}
              </Text>
            </View>
          </View>

          <View className="flex flex-row w-[80%] mt-1 justify-between">
            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="#cc3300" />
              <Text className=" text-[#cc3300] ml-2">
                Malicious: {last_analysis_stats.malicious}
              </Text>
            </View>

            <View className="flex flex-row  items-center ">
              <Octicons name="dot-fill" size={24} color="gray" />
              <Text className=" text-gray-500 ml-2">
                Undetect : {0}
              </Text>
            </View>
          </View>
          {/* <Text>
            {JSON.stringify(allScan)}

          </Text> */}
          <View className="w-[100%] flex-col items-center">
            <View className="w-[100%]">
              <Text className="text-xl font-medium  text-[#3D8FEF] ">
                Total User Votes:
              </Text>
            </View>

            <View
              className="flex flex-row  items-center justify-between w-[80%]
               "
            >
              <View className="flex flex-row  items-center ">
                <Octicons name="dot-fill" size={24} color="green" />
                <Text className=" text-green-600 ml-2">
                  Harmless: {totalVotes.harmless}
                </Text>
              </View>
              <View className="flex flex-row  items-center ">
                <Octicons name="dot-fill" size={24} color="#cc3300" />
                <Text className=" text-[#cc3300] ml-2">
                  Malicious: {totalVotes.malicious}
                </Text>
              </View>
            </View>
          </View>
            </View>
        
            <View className="flex flex-col w-[100%] h-[55%] mt-6">
            <FlatList
              data={allScan}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.engine_name}
            />
          </View>
        </View>
      );
    }
  }
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
      <View className="flex flex-col  items-center h-screen ">
        <Header2 title="URL Check" />

        <View className="flex flex-col  items-center w-[90%] ">
          <TextInput
            className="rounded-2xl h-16 text-[#4a4949] bg-[#F7F7F9] w-[100%] px-4"
            onChangeText={(text) => setText(text)}
            placeholder="Enter Url..."
            textAlignVertical="center"
          ></TextInput>
        </View>
        <TouchableOpacity
          className="
            flex flex-row items-center justify-center w-[35%] mt-[5%] bg-[#3D8FEF] h-12 rounded-lg
        "
          onPress={() => handleScan(text)}
        >
          <Text className="text-2xl font-medium text-center  text-white ">
            Scan
          </Text>
 
        </TouchableOpacity>
        <Summary />

        {/* <FlatList
        data={lessons}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList> */}
      </View>
    </SafeAreaView>
  );
};

export default UrlCheck;
