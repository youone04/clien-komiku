import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet,Image } from "react-native";

export default function ReadKomik({ route }) {
  const { link } = route.params;
  const [dataBacaKomik, setDataBacaKomik] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    getBacaKomik();
  }, []);

  const getBacaKomik = async () => {
    const data = await fetch(`http://192.168.246.39:8800/api/baca/ch/${link}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const dataKomik = await data.json();
    setDataBacaKomik((prev) => ({
      ...prev,
      loading: false,
      data: dataKomik.data,
    }));
  };
  return (
    <View>
      {dataBacaKomik.loading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView>
          {dataBacaKomik.data.map((i, d) => {
            return (
              <View key={d}>
                <View style={{ marginTop: 50 }}><Text>-----------------------</Text></View>
                <Image style={styles.stretch} source={{ uri: `${i.img}` }} />
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stretch: {
    width: "100%",
    minHeight: 1000,
    // resizeMode: 'stretch',
    // overflow: "clip"
  },
});
