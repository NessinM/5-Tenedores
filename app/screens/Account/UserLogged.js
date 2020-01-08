
import React, { useState, useEffect, useRef}    from 'react'
import * as firebase                    from 'firebase'
import { View, Text }                   from 'react-native';
import { Button }                       from 'react-native-elements'
import InfoUser                         from '../../components/Account/InfoUser'
import Toast                            from 'react-native-easy-toast'
import Loading                          from '../../components/Loading'

export default function UserLogged() {
  const [userInfo, setUserInfo]       = useState({})
  const [reLoadData, setReLoadData]   = useState(false)
  const [isLoading, setIsLoading]     = useState(false)
  const [textLoading, setTextLoading] = useState('')
  const toastRef                      = useRef()

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0])
    })();
    setReLoadData(false)
  }, [reLoadData])
  return (
    <View> 
      <InfoUser 
        userInfo       = {userInfo}
        setReLoadData  = {setReLoadData}
        toastRef       = {toastRef}
        setIsLoading   = {setIsLoading}
        setTextLoading = {setTextLoading}
      />
      <Button title = "Cerrar sesión" onPress={() => firebase.auth().signOut()}/>
      <Toast ref={toastRef} position="center" opacity={0.5}></Toast>
      <Loading text={textLoading} isVisible={isLoading}></Loading>
    </View>
  );
}
