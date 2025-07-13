import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './src/Home'
import StackNav from './src/navigation/StackNav'
LogBox.ignoreAllLogs()
const App = () => {
  return (
 <StackNav />
  )
}

export default App

const styles = StyleSheet.create({})