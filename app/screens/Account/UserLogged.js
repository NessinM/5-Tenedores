import React              from 'react'
import * as firebase      from 'firebase'
import { View, Text }     from 'react-native';
import { Button }         from 'react-native-elements'

export default function UserLogged () {
  return (
    <View> 
      <Text> User Logueddd !!</Text>
      <Button 
        title = "Cerrar sesión"
        onPress={() => firebase.auth().signOut()}
      />
  </View>
  )
}