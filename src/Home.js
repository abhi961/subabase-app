import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../src/subabase";
import { uploadPdf } from "../src/UploadPdf";
import CustomButton from "./components/CustomButton";

export default function Home({ navigation }) {
  const LOgo = require("../assets/folder.png");
  const [uploading, setUploading] = useState(false);
  const [errMsg,setErrMsg] = useState('')
  const[pdfError,setPdfError] = useState()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    }
  };

  const uploadFile = async (fileUri) => {
    Alert.alert(
      "Confirm Upload",
      "Are you sure you want to upload this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: ()=>{
            setErrMsg("Error: Cancel Image Upload by users")
          }
        },
        {
          text: "Upload",
          onPress: async () => {
           
            try {
              setUploading(true);

              const fileParts = fileUri.split("/");
              const fileName = fileParts[fileParts.length - 1];
              const fileExt = fileName.split(".").pop();
              console.log(fileName, "FileName");

              const filePath = `${Date.now()}.${fileExt}`;
              const formData = new FormData();
              formData.append("image", {
                uri: fileUri,
                name: fileName,
                type: `image/${fileExt}`,
              });

              const { data, error } = await supabase.storage
                .from("uploads")
                .upload(filePath, formData);

              if (error) {
                throw error;
              }

              Alert.alert("Success", "Image uploaded successfully!");
              navigation.navigate("list");
            } catch (error) {
                
              Alert.alert("Error", error.message);
            } finally {
              setUploading(false);
            }
          },
        },
      ]
    );
  };

  // pdf upload

  const handleUpload = async () => {
    Alert.alert(
        "Confirm Upload",
      "Are you sure you want to upload Pdf ?",
        [
             {
          text: "Cancel",
          style: "cancel",
          onPress: ()=>{
            setErrMsg("Error: Cancel pdf Upload by users")
          }
        },
        {
            text:'upload',
            onPress:async()=>{
              setUploading(true);
    try {
      const url = await uploadPdf();
      navigation.navigate("list");
      Alert.alert("Success", "PDF uploaded successfully!");
      console.log("url------->:", url);
    } catch (err) {
      console.error("Upload Error:", err);
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
            }
        }
        ]
    )
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoConatiner}>
        <Image source={LOgo} style={styles.logoImage} />
        <Text style={styles.title}>File Upload to Supabase</Text>
        
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={pickImage}
          disabled={uploading}
          title={"Upload Image"}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={"Uplaod pdf "}
          onPress={handleUpload}
          disabled={uploading}
        />
      </View>
      <Text style={{color:'red', textAlign:'center', fontSize:16, fontWeight:'bold'}}>{errMsg}</Text>
      {uploading && <Text style={styles.uploadText}>Uploading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  logoConatiner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  logoImage: { width: 30, height: 30, tintColor: "#cc0066" },
  uploadText:{

    color:"red",
    fontSize:16,
    fontWeight:'bold'
  }
});
