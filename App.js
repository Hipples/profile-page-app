import { StatusBar } from 'expo-status-bar';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <PaperProvider>
      <View style={{flex: 1, margin: 30}}>
        <MyComponent />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const MyComponent = () => {
  const [ value, setValue ] = useState('')
  const [ storedValue, setStoredValue] = useState('value')
  const { getItem, setItem } = useAsyncStorage('name')

  const getStoredItems = async() => {
    const item = await getItem()
    setStoredValue(item)
    console.log(storedValue)
  }
  const storeItem = async (newValue) => {
    await setItem(newValue);
    setStoredValue(newValue);
  }
  useEffect(() => { getStoredItems() }, [])

  return (
    <>
      <TextInput
        label="Name"
        value={value}
        onChangeText={(newValue) => setValue(newValue)}
        mode="outlined"
      />
    <Button mode="contained-tonal" onPress={() => {storeItem(value); setValue("")}}>Submit</Button>
    <Button mode="contained-tonal" onPress={async () => {
      try {
        await AsyncStorage.clear()
        } catch (error) {
          console.log(error)
        }
          console.log("Done")} }>Clear Storage</Button>
    <Surface style={styles.surface} elevation={4}>
    <Text>{storedValue}</Text>
    </Surface>
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});