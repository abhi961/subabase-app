import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Home'
import List from '../List'
import Splash from '../Splash'

const Stack = createNativeStackNavigator()

const StackNav = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='splash' screenOptions={{headerShown:false}}>
      <Stack.Screen name='splash'component={Splash} />
      <Stack.Screen  name='home' component={Home}/>
      <Stack.Screen  name='list' component={List}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNav