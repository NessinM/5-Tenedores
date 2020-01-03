import React, { useState}           from 'react'
import { StyleSheet, View}          from 'react-native'
import { Input, Icon, Button}       from 'react-native-elements'
import { validateEmail }            from '../../utils/Validation'
import Loading                      from '../../components/Loading'
import * as firebase                from 'firebase'
import {withNavigation} from 'react-navigation'

 function LoginForm (props) {
  const { toastRef, navigation }                = props
  const [hidePassword, setHidePassword]         = useState(true)
  const [email, setEmail]                       = useState("")
  const [password, setPassword]                 = useState("")
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)
  
  const login = async () => {
    setIsVisibleLoading(true)
    if (!email || !password) toastRef.current.show('Todos los campos son obligatorios')
    else {
      if (!validateEmail(email)) toastRef.current.show('El email no cumpel el formato correcto')
      else await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate('MyAccount')
            })
            .catch((exc) => {
              toastRef.current.show(exc.message)
            })
    }
    setIsVisibleLoading(false)
  }

  return (
    <View style={styles.formContainer}>
        <Input
          placeholder    = "Correo electronico"
          conatinerStyle = {styles.inputForm}
          onChange       = {e => setEmail(e.nativeEvent.text)}
          rightIcon = {
            <Icon 
              type      = "material-community"
              name      = "at"
              iconStyle = {styles.iconRight}
            />
          }
        />
        <Input
          placeholder     = "Contraseña"
          password        = {true}
          secureTextEntry = {hidePassword}
          conatinerStyle  = {styles.inputForm}
          onChange        = {e => setPassword(e.nativeEvent.text)}
          rightIcon  = {
            <Icon 
              type      = "material-community"
              name      = {hidePassword ? "eye-outline" : "eye-off-outline"}
              iconStyle = {styles.iconRight}
              onPress   = {() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Button
          title          = "Iniciar sesión"
          containerStyle = {styles.btnContainerlogin}
          buttonStyle    = {styles.btnLogin}
          onPress={login}
        />
        <Loading text="Iniciando sesión" isVisible={isVisibleLoading}></Loading>
    </View>
  )
}


export default withNavigation(LoginForm)

const styles = StyleSheet.create ({
  formContainer : {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    marginTop     : 30
  },
  inputForm : {
    width : '100%',
    marginTop : 20
  },
  iconRight : {
    color : '#c1c1c1'
  },
  btnLogin : {
    backgroundColor : '#00a680'
  },
  btnContainerlogin : {
    marginTop: 20,
    width    : "95%"
  },
})
