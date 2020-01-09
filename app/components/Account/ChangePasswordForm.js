import React , {useState}                                 from 'react'
import { StyleSheet, View, Text }                         from 'react-native'
import { Input, Button}                                   from 'react-native-elements'
import * as firebase                                      from 'firebase'
import {reauthenticate}                                   from '../../utils/Api'

export default function ChangePasswordForm(props) {
  const {setIsVisibleModal, toastRef}                     = props
  const [password, setPassword]                           = useState('')
  const [newPassword, setNewPassword]                     = useState('')
  const [newPasswordRepeat, setNewPasswordRepeat]         = useState('')
  const [error , setError]                                = useState({})
  const [isLoading , setIsLoading]                        = useState(false)
  const [hidePassword, setHidePassword]                   = useState(true)
  const [hideNewPassword, setHideNewPassword]             = useState(true)
  const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true)


  const updatePassword = () => {
    setError({})
    if (!password || !newPassword || !newPasswordRepeat) {
      let objError = {}
      !password && (objError.password = 'No puede estar vacio')
      !newPassword && (objError.newPassword = 'No puede estar vacio')
      !newPasswordRepeat && (objError.newPasswordRepeat = 'No puede estar vacio')
      setError(objError)
    } else {
      if (newPassword !== newPasswordRepeat) {
        setError({
          newPassword      : 'Las nuevas contarseñas tienen que ser iguales',
          newPasswordRepeat: 'Las nuevas contarseñas tienen que ser iguales'
        })
      } else {
        setIsLoading(true)
        reauthenticate(password).then(() => {
          firebase.auth().currentUser.updatePassword(newPassword).then(() => {
            setIsLoading(false)
            toastRef.current.show('Contraseña actualizada correctamente')
          })
          .catch(() => {
            toastRef.current.show('Error al actualizar la contarseña')
          })
        })
        .catch(() => {
          setError({password : ' La contraseña no es correcta'})
          setIsLoading(false)
        })
      }
    }
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Actualizar Contraseña</Text>
      <Input 
          placeholder     = 'contraseña actual'
          containerStyle  = {styles.input}
          password       = {true}
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
      ></Input>
      <Input 
          placeholder     = 'nueva contraseña'
          containerStyle  = {styles.input}
          password       = {true}
          secureTextEntry = {hideNewPassword}
          onChange        = {e => setNewPassword(e.nativeEvent.text)}
          rightIcon       = {
            {
              type   : "material-community",
              name   : hideNewPassword ? 'eye-outline': 'eye-off-outline',
              color  : '#c2c2c2',
              onPress: () => setHideNewPassword(!hideNewPassword)
            }
          }
        errorMessage={error.newPassword}
      ></Input>
       <Input 
          placeholder     = 'repite la nueva contraseña'
          containerStyle  = {styles.input}
          password       = {true}
          secureTextEntry = {hideNewPasswordRepeat}
          onChange        = {e => setNewPasswordRepeat(e.nativeEvent.text)}
          rightIcon       = {
            {
              type   : "material-community",
              name   : hideNewPasswordRepeat ? 'eye-outline': 'eye-off-outline',
              color  : '#c2c2c2',
              onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
            }
          }
        errorMessage = {error.newPasswordRepeat}
      ></Input>

      <Button 
        title          = "Actualizar contraseña"
        containerStyle = {styles.btnContainer}
        buttonStyle    = {styles.btn}
        onPress        = {updatePassword}
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
    marginBottom : 15
  },
  btnContainer : {
    marginTop: 20,
    width : '100%'
  },
  btn : {
    backgroundColor : '#00a680'
  },
  headerText : {
    fontSize     : 19,
    paddingTop   : 10,
    paddingBottom: 20,
    fontWeight   : 'bold'
  }
})