import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View>
<Button title='click me ' onPress={()=>navigation.navigate('LoginScreen')}/>
    </View>
  )
}

export default HomeScreen 

const styles = StyleSheet.create({})