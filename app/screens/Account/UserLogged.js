
import React, { useState, useEffect, useRef}    from 'react'
import * as firebase         from 'firebase'
import { StyleSheet, View }  from 'react-native';
import { Button }            from 'react-native-elements'
import Toast                 from 'react-native-easy-toast'
import Loading               from '../../components/Loading'
import InfoUser              from '../../components/Account/InfoUser'
import AccountOptions        from '../../components/Account/AccountOptions'

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
    <View style={styles.viewUserInfo}> 
      <InfoUser 
        userInfo       = {userInfo}
        setReLoadData  = {setReLoadData}
        toastRef       = {toastRef}
        setIsLoading   = {setIsLoading}
        setTextLoading = {setTextLoading}
      />
      <AccountOptions  
        userInfo      = {userInfo}
        setReLoadData = {setReLoadData}
        toastRef      = {toastRef}
      />
      <Button 
        title       = "Cerrar sesión"
        titleStyle  = {styles.btnCloseSessionText}
        onPress     = {() => firebase.auth().signOut()}
        buttonStyle = {styles.btnCloseSession}
      />
      <Toast ref={toastRef} position="center" opacity={0.5}></Toast>
      <Loading text={textLoading} isVisible={isLoading}></Loading>
    </View>
  );

}


const styles = StyleSheet.create({
  viewUserInfo : {
    minHeight      : '100%',
    backgroundColor: '#f2f2f2'
  },
  btnCloseSession : {
    marginTop        : 30,
    borderRadius     : 0,
    backgroundColor  : '#fff',
    borderTopWidth   : 1,
    borderTopColor   : '#e3e3e3',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingTop       : 10,
    paddingBottom    : 10
  },
  btnCloseSessionText : {
    color     : '#00a680',
    fontWeight: 'bold'
  }
})