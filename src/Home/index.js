import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";
import { Button, Card } from "react-native-elements";

function Home({ navigation }) {
  const [dataHome, setDataHome] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    getKomikHome();
  }, []);

const toListChapter = (link) => {
  navigation.navigate('List-Chapter', {
    link: link,
    // otherParam: { link, tujuan, tgl },
})

}

  const getKomikHome = async () => {
    try {
      const data = await fetch("http://192.168.246.39:8800/api/terbaru", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const dataKomik = await data.json();
      setDataHome((prev) => ({
        ...prev,
        loading: false,
        data: dataKomik,
      }));
    } catch (e) {
      throw e;
    }
  };
  return (
    <View style={styles.containers}>
      <Text>Home</Text>
      {dataHome.loading ? (
        <Text>Loading</Text>
      ) : (
        <ScrollView>
          {dataHome.data.data.map((i, d) => {
            return (
              <TouchableOpacity key={d} onPress={() => toListChapter(i.link)}>
                <View style={styles.container}>
                <Card title="Local Modules" elevation={7}>
                    {/*react-native-elements Card*/}
                <Image
                    style={styles.stretch}
                    source={{uri:`${i.img}`}}

                />
                  <Text style={styles.paragraph}>
                   {i.title}
                  </Text>
                </Card>
              </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        backgroundColor: 'white',
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
      },
      stretch: {
        width: '100%',
        height: 150,
        // resizeMode: 'stretch',
      },
});
