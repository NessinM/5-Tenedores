import React                                         from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button }                                    from 'react-native-elements';
import { withNavigation }                            from 'react-navigation'

function UserGuest (props) {

  const { navigation } = props

  return (
   <ScrollView>
     <Image 
      source={require("../../../assets/img/user-guest.jpg")} 
      style={styles.image}
     />
     <Text style={styles.title}> Consulta tu perfil de 5 Tenedores</Text>
     <Text style={styles.description}> ¿Como describirias tu mejor restaurante ? Busca y visualiza los mejores 
      restaurantes de una forma sencilla, vota cual te ha gustado más y comenta como ha sido tu experiencia 
     </Text>
     <View style={styles.viewBody}>
        <Button 
          title          = "Ver tu perfil"
          buttonStyle    = {styles.btnStyle}
          containerStyle = {styles.btnContainer}
          onPress        = {() => navigation.navigate('Login')}
        />
     </View>
   </ScrollView>
  )
}

export default withNavigation(UserGuest)

const styles = StyleSheet.create({
  viewBody : {
    marginLeft : 30,
    marginRight: 30
  },
  image : {
    height      : 330,
    width       : "100%",
    marginBottom: 30
  },
  title : {
    fontWeight  : 'bold',
    fontSize    : 19,
    marginBottom: 10,
    textAlign   : 'center'
  },
  description : {
    textAlign   : 'center',
    marginBottom: 20
  },
  viewBtn : {
    flex      : 1,
    alignItems: 'center'
  },
  btnStyle : {
    backgroundColor: '#00a680'
  },
  btnContainer : {
    width: '100%'
  }
})