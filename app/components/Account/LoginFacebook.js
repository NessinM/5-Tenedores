import React, {useState}  from 'react'
import { SocialIcon }     from 'react-native-elements'
import * as firebase      from 'firebase'
import * as Facebook      from 'expo-facebook';
import { FacebookApi}     from '../../utils/Social'
import Loading            from '../Loading'
import { View }           from 'react-native';

export default function LoginFacebook(props) {
  const { navigation, toastRef }                = props
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)

  const login = async () => {
    await Facebook.initializeAsync(FacebookApi.application_id);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync( FacebookApi.application_id, { permissions : FacebookApi.permission} )
    if (type === 'success') {
      setIsVisibleLoading(true)
      const credentials = firebase.auth.FacebookAuthProvider.credential(token)
      await firebase
              .auth()
              .signInWithCredential(credentials)
              .then(() => {
                navigation.navigate('MyAccount')
              })
              .catch ((err) => {
                toastRef.current.show(`Error : ${err.message}`)
              })
    } else if (type === 'cancel' ) toastRef.current.show('Inicio de sesión cancelado')
    else  toastRef.current.show('Error desconocido, Intentelo mas tarde')
    setIsVisibleLoading(false)
  }

  return (
    <View>
      <SocialIcon
        title="Iniciar sesíon con Facebook"
        button
        type="facebook"
        onPress={login}
      />
      <Loading text="Iniciando sesión" isVisible={isVisibleLoading}></Loading>
    </View>
  )
}