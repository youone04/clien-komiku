import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListChapter from './src/ListChapter';
import ReadKomik from './src/ReadKomik';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <View style={styles.container}>
    <NavigationContainer>
    <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="Home" component={Home} />
          <Stack.Screen  name="List-Chapter" component={ListChapter} />
          <Stack.Screen  name="Read-Komik" component={ReadKomik} />
    </Stack.Navigator>
    </NavigationContainer>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABC270',
  },
});