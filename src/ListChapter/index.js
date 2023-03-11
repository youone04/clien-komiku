import React, { useEffect , useState } from 'react'
import { ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from "react-native";

function ListChapter({ route , navigation }) {
  const { link } = route.params;
  const [dataListChapter, setDataListChapter] = useState({
    loading: true,
    data: [],
  });

    useEffect(()=> {
        getListChapter();
    },[])

    const getListChapter = async() => {
        try{
          
          const data = await fetch(`http://192.168.246.39:8800/api/pilih-chapter/${link}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })

          const listChapter = await data.json();
          setDataListChapter((prev) => ({
            ...prev,
            loading: false,
            data: listChapter.data,
          }))

        }catch(e){
            throw e
        }
    }

    const readKomik = (link) => {
      navigation.navigate('Read-Komik', {
        link: link,
        // otherParam: { link, tujuan, tgl },
    })
    }

  return (
    <View>
      {
        dataListChapter.loading?
        <Text>Loading</Text>:
        <ScrollView>
           {
              dataListChapter.data.map((d,i) => {
                return(
                  <TouchableOpacity key={i} onPress={() => readKomik(d?.link_chapter)}>
                  <View style={styles.container}>
                    <Text>{d.title}</Text>
                  </View>
                  </TouchableOpacity>
                )
              })
            }
        </ScrollView>
      }
    </View>
  )
}

export default ListChapter;

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