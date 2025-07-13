// utils/uploadPdf.js
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { Alert } from "react-native";
import { useState } from "react";

export const uploadPdf = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/pdf",
    copyToCacheDirectory: true,
  });

  if (result.canceled || !result.assets?.[0]) {
    return Alert.alert("Cancelled", "No file selected");
  }

  const file = result.assets[0];
  const fileUri = file.uri;
  const fileName = `${Date.now()}-${file.name}`;
  console.log(file, "File@@@@@@@@@@@@@@@@");

  try {
    
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const fileSizeLimit = 5 * 1024 * 1024;
    if(fileInfo.size > fileSizeLimit){
      
      Alert.alert('File Too Large", "Please select a file smaller than 5MB.')
    
    }
    const fileBlob = {
      uri: fileUri,
      name: fileName,
      type: "application/pdf",
    };
    // console.log(fileInfo,"fileInfo---")

    const formData = new FormData();
    formData.append("uploads", fileBlob);

    const uploadUrl = `${"https://roigorgvifpnsnalslob.supabase.co"}/storage/v1/object/${"uploads"}/${fileName}`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvaWdvcmd2aWZwbnNuYWxzbG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMDUwMTUsImV4cCI6MjA2Nzg4MTAxNX0.jMAfDB2HNpnC5jv_B2oe9mQezQy6bFPtiaNLSOeBiSo"}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Upload failed");
    }
    navigation.navigate("list");
    Alert.alert("Success", "PDF uploaded successfully!");
  } catch (err) {
    console.error("Upload Error:", err);
    Alert.alert("Error", err.message || "Something went wrong");
  }
};
