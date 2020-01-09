import React,{useState}           from 'react'
import { StyleSheet, View, Text }       from 'react-native'
import { Input, Button}           from 'react-native-elements'
import * as firebase              from 'firebase'
import {reauthenticate}           from '../../utils/Api'
import {validateEmail}            from '../../utils/Validation'

export default function ChangeEmailForm(props) {
  const {email, setIsVisibleModal, setReLoadData, toastRef} = props
  const [newEmail, setNewEmail]                             = useState('')
  const [password, setPassword]                             = useState('')
  const [error, setError]                                   = useState({})
  const [isLoading, setIsLoading]                           = useState(false)
  const [hidePassword, setHidePassword]                     = useState(true)

  const updateEmail = () => {
   setError({})
   if (!newEmail || email === newEmail) setError({email : 'El email no puede ser igual o vacio'})
   else if (!validateEmail(newEmail))   setError({email : 'El email no cumple con el formato adecuado'})
   else {
     setIsLoading(true)
     reauthenticate(password).then(()=> {
      firebase.auth().currentUser
        .updateEmail(newEmail)
          .then(() => {
            setIsLoading(false)
            setReLoadData(true)
            toastRef.current.show('Email actualizado correctamente')
            setIsVisibleModal(false)
          }).catch(() => {
            setError({email : 'Error al actualizar el email'})
          })
     }).catch(() => {
       setError({password : 'La contraseña no es correcta'})
       setIsLoading(false)
     })
   }
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Actualizar Email</Text>
      <Input
        placeholder    = 'correo electronico'
        containerStyle = {styles.input}
        defaultValue   = {email && email}
        onChange       = {e => setNewEmail(e.nativeEvent.text)}
        rightIcon      = {
            {
              type  : "material-community",
              name  : "at",
              color : '#c2c2c2'
            }
          }
          errorMessage = {error.email}
        />
        <Input
          placeholder     = 'contraseña'
          containerStyle  = {styles.input}
          password        = {true}
          secureTextEntry = {hidePassword}
          onChange        = {e => setPassword(e.nativeEvent.text)}
          rightIcon       = {
              {
                type   : "material-community",
                name   : hidePassword ? 'eye-outline': 'eye-off-outline',
                color  : '#c2c2c2',
                onPress: () => setHidePassword(!hidePassword)
              }
            }
          errorMessage={error.password}
        />
        <Button 
          title          = "Actualizar email"
          containerStyle = {styles.btnContainer}
          buttonStyle    = {styles.btn}
          onPress        = {updateEmail}
          loading        = {isLoading}
        ></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  view : {
    alignItems   : 'center',
    paddingTop   : 10,
    paddingBottom: 10
  },
  input :{
    marginBottom: 15
  },
  btnContainer : {
    marginTop: 20,
    width    : '100%'
  },
  btn : {
    backgroundColor: '#00a680'
  },
  headerText : {
    fontSize     : 19,
    paddingTop   : 10,
    paddingBottom: 20,
    fontWeight   : 'bold'
  }
})