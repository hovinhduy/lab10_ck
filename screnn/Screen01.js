import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const Screen01 = () => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontWeight: 400, fontSize: 15 }}>
        A premium online store for{"\n"} sporter and their stylish choice
      </Text>
      <View style={styles.anhnen}>
        {/* <Image
          source={{
            uri: "https://i.ibb.co/gFHRcmv/bifour-removebg-preview.png",
          }}
          style={styles.image}
        /> */}
        <Image source={require("../assets/1.png")} />
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontWeight: 700, fontSize: 20, textAlign: "center" }}>
          POWER BIKE{"\n"} SHOP
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          style={{
            width: 340,
            height: 50,
            backgroundColor: "#E94141",
            borderRadius: 20,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  anhnen: {
    width: 340,
    height: 380,
    backgroundColor: "#E941411A",
    borderRadius: 50,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Screen01;
