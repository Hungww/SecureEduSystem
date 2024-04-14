import { set } from "firebase/database";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image , TouchableOpacity, SafeAreaView} from "react-native";
import Header2 from "../components/Header2";

const Game1_Screen2 = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [intructions, setInstructions] = useState("Try Again to see the explanation of others");
  return (
    <SafeAreaView className="bg-[#FFFFFF] h-screen">
        <View className="flex flex-col  items-center h-screen ">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}
            className="bg-[#FFFFFF] w-[90%] rounded-2xl shadow-md flex flex-col items-center"
          >
            
            {isCorrect && (<Image source={require('../../assets/correct.png')} resizeMode="contain" style={{width: 70, height: 70, borderRadius: 10}}></Image>)}
            {!isCorrect && (<Image source={require('../../assets/incorrect.png')} resizeMode="contain" style={{width: 70, height: 70, borderRadius: 10}}></Image>)}
            {isCorrect && (
              <Text className=" text-xl font-semibold text-center mt-2">
                Congratulations your answer is correct
              </Text>
            )}
            {!isCorrect && (
              <Text className=" text-xl font-semibold text-center mt-2">
                Your answer is incorrect
              </Text>

            )}
            <Text  className="text-base">{intructions}</Text>
            <TouchableOpacity
          className="
            flex flex-row items-center justify-center w-[65%] mt-[5%] bg-[#3D8FEF] h-12 rounded-lg
        "
          onPress={() =>setModalVisible(false)}
        >
          <Text className="text-2xl font-medium text-center  text-white ">
            Close
          </Text>
 
        </TouchableOpacity>
          </View>
        </View>
      </Modal>

    <Header2 title={"Mission 2: Evaluate link"}></Header2>
    <View className="flex flex-col items-center w-[90%]">
    <Text className="text-lg font-normal   mt-4">
    Which of the links following contains risk to your security?
        </Text>


    <TouchableOpacity className= "flex flex-row w-[100%] p-2 mt-8"
    
    onPress={()=>{
        setIsCorrect(true);
        setInstructions("Try Again to see the explanation of others");
        setModalVisible(true);
        
    }}>
        <View className = "flex flex-row  items-center justify-center h-[70] w-[70] rounded-full bg-sky-300">
            <Text className="text-white font-semibold text-xl">A</Text>
        </View>

        <View className= "flex flex-row justify-center items-center ">
        <Text className=" font-medium text-base ml-[6%]    ">
        https://www.vietcombank.com.vn/
        </Text>
        </View>

    </TouchableOpacity>

    <TouchableOpacity className= "flex flex-row w-[100%] p-2 mt-4"
    onPress={()=>{
      setIsCorrect(false);
      setInstructions("No https:Legitimate bank websites will have a secure connection indicated by \"https\" at the beginning of the URL");
      setModalVisible(true);
      
  }}>
        <View className = "flex flex-row  items-center justify-center h-[70] w-[70] rounded-full bg-sky-300">
            <Text className="text-white font-semibold text-xl">A</Text>
        </View>

        <View className= "flex flex-row justify-center items-center ">
        <Text className=" font-medium text-base ml-[6%]    ">
        www.vietcombank.com.vn/
        </Text>
        </View>

    </TouchableOpacity>

    <TouchableOpacity className= "flex flex-row w-[100%] p-2 mt-4"
    onPress={()=>{
      setIsCorrect(false);
      setInstructions("Generic domain names: Avoid links with generic domain names like \".info\" or \".top\" instead of the bank's official domain (e.g., \".com\", \".co.uk\")");
      setModalVisible(true);
      
  }}
    
    >
        <View className = "flex flex-row  items-center justify-center h-[70] w-[70] rounded-full bg-sky-300">
            <Text className="text-white font-semibold text-xl">A</Text>
        </View>

        <View className= "flex flex-row justify-center items-center ">
        <Text className=" font-medium text-base ml-[6%]   ">
        https://www.vietcombank.info
        </Text>
        </View>

    </TouchableOpacity>

    <TouchableOpacity className= "flex flex-row w-[100%] p-2 mt-4"
    onPress={()=>{
      setIsCorrect(false);
      setInstructions("Misspelled URLs: Look closely at the bank's name in the web address but it swap characters o to 0 (com -> c0m)");
      setModalVisible(true);
      
  }}>
        <View className = "flex flex-row  items-center justify-center h-[70] w-[70] rounded-full bg-sky-300">
            <Text className="text-white font-semibold text-xl">A</Text>
        </View>

        <View className= "flex flex-row justify-center items-center ">
        <Text className=" font-medium text-base ml-[6%]  ">
        https://www.vietc0mbank.com.vn/
        </Text>
        </View>

    </TouchableOpacity>
    </View>


    <TouchableOpacity
          className="
            flex flex-row items-center justify-center w-[85%] mt-[7%] bg-[#3D8FEF] h-12 rounded-lg
        "
          onPress={() => navigation.navigate("Main")}
        >
          <Text className="text-2xl font-medium text-center  text-white ">
            Back to home
          </Text>
 
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Game1_Screen2;
