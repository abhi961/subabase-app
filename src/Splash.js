import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({navigation}) => {
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('home')
        }, 2000);
    })
     const LOgo = require('../assets/folder.png');
  return (
    <View style={styles.container}>
      <Image source={LOgo} style={styles.logoImage} />
      <Text style={styles.welcomeText}>Welcome to Our Application</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#cc0066',
        justifyContent:'center',
        alignItems:'center'
        
    },
    logoImage:{
        tintColor:'#fff',
        resizeMode:'contain',
        width:100,
        height:100
    },
    welcomeText:{
        fontSize:18,
        fontWeight:'900',
        color:'#fff',
        marginTop:20
    }
})