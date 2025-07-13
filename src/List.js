import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "./subabase";
import { useIsFocused } from "@react-navigation/native";

const List = ({ navigation }) => {
  const Arrow = require("../assets/arrow.png");
  const isFocused = useIsFocused();
  const pdfIcon = require("../assets/pdf.png");
  const [loading, setLoading] = useState();
  const [uData, setUdata] = useState("");

  const fetchDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("uploads").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });
    console.log(data, "Dataaaa-------------11111");
    setUdata(data);
  };

  useEffect(() => {
    fetchDetails();
  }, [isFocused]);
  return (
    <>
      <StatusBar barStyle={"default"} backgroundColor={"#cc0066"} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Arrow} style={styles.backImg} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={uData}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              {item.name.endsWith(".pdf") ? (
                <TouchableOpacity
                  onPress={() =>
                    item.name.endsWith(".pdf") &&
                    Linking.openURL(
                      `https://roigorgvifpnsnalslob.supabase.co/storage/v1/object/public/uploads//${item.name}`
                    )
                  }
                >
                  <Image
                    source={item.name.endsWith(".pdf") && pdfIcon}
                    style={styles.listConent}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  source={{
                    uri: `https://roigorgvifpnsnalslob.supabase.co/storage/v1/object/public/uploads//${item?.name}`,
                  }}
                  style={styles.listConent}
                />
              )}
            </View>
          );
        }}
      />
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 50,
    alignSelf:'center'
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  backImg: { resizeMode: "contain", width: 20, height: 20 },
  listConent: {
    width: 150,
    height: 150,
  },
});
