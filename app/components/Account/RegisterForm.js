import React , { useState }         from 'react'
import * as firebase                from 'firebase'
import { StyleSheet, View}          from 'react-native'
import { withNavigation}            from 'react-navigation'
import { Input, Icon, Button}       from 'react-native-elements'
import { validateEmail }            from '../../utils/Validation'
import Loading                      from '../Loading'

 function RegisterForm (props) {
  const { toastRef, navigation }                                        = props
  const [hidePassword, setHidePassword]                     = useState(true)
  const [hideRepeatHidePassword, setHideRepeatHidePassword] = useState(true)
  const [email, setEmail]                                   = useState("")
  const [password, setPassword]                             = useState("")
  const [repeatPassword, setRepeatPassword]                 = useState("")
  const [isVisibleLoading, setIsVisibleLoading]             = useState(false)


  const register =  async () => {
    setIsVisibleLoading(true)
    if (!email  || !password || !repeatPassword) toastRef.current.show('Todos los campos son obligatorios')
    else {
      if (!validateEmail(email))  toastRef.current.show('El email no es correcto')
      else {
        if (password !== repeatPassword) toastRef.current.show('Las contraseñas no coinciden')
        else await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                      navigation.navigate('MyAccount')
                    }).catch((exp) => { toastRef.current.show(exp.message)})
      }
    }
    setIsVisibleLoading(false)
  }

  return (
    <View style={styles.formContainer} >
        <Input 
          placeholder    = "Correo electronico"
          containerStyle = {styles.inputForm}
          onChange       = {e => setEmail(e.nativeEvent.text)}
          rightIcon      = {
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
          containerStyle  = {styles.inputForm}
          onChange        = {e => setPassword(e.nativeEvent.text)}
          rightIcon       = {
            <Icon 
              type      = "material-community"
              name      = {hidePassword ? 'eye-outline' : 'eye-off-outline'}
              iconStyle = {styles.iconRight}
              onPress={() => setHidePassword(!hidePassword)}
            />
          }
        />
        <Input 
          placeholder     = "Repetir contraseña"
          password        = {true}
          secureTextEntry = {hideRepeatHidePassword}
          containerStyle  = {styles.inputForm}
          onChange        = {e => setRepeatPassword(e.nativeEvent.text)}
          rightIcon       = {
            <Icon 
              type      = "material-community"
              name      = {hideRepeatHidePassword ? 'eye-outline' : 'eye-off-outline'}
              iconStyle = {styles.iconRight}
              onPress={() => setHideRepeatHidePassword(!hideRepeatHidePassword)}
            />
          }
        />

        <Button 
          title          = "Unirse"
          containerStyle = {styles.btnContainerRegister}
          buttonStyle    = {styles.btnRegister}
          onPress        = {register}
        />
        <Loading text="Creando cuenta" isVisible={isVisibleLoading}></Loading>
    </View>
  )
}

export default withNavigation(RegisterForm)

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
  btnContainerRegister : {
    marginTop: 20,
    width    : "95%"
  },
  btnRegister : {
    backgroundColor : '#00a680'
  }
})
