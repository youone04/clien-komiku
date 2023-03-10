import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

function Home() {

    const [dataHome , setDataHome] = useState({
        loading: true,
        data: []
    })

    useEffect(() => {
        getKomikHome();

    },[]);

    const getKomikHome = async() => {
        try{
           const data = await fetch('http://192.168.253.39:3000/api/terbaru', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
            });

            const dataKomik = await data.json();
            setDataHome((prev) => ({
                ...prev,
                loading: false,
                data: dataKomik
            }))

        }catch(e){
            throw e
        }
    }    
  return (
    <View style={styles.container}>
        <Text>Home</Text>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
    container: {
      
    },
  });