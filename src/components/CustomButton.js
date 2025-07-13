import { View, Text, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'

export default function CustomButton({onPress,disabled,title}) {
  return (
   <TouchableOpacity 
   style={styles.buttonConatiner}
   onPress={onPress} disabled={disabled}>
    <Text style={styles.text1}>{title}</Text>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
buttonConatiner:{
    backgroundColor:'#cc0066',
    paddingVertical:16,
    borderRadius:10
},
text1:{
    textAlign:'center',
    color:'#fff',
    fontSize:15, 
    fontWeight:'600'
}
})