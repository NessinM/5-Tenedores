import React, { useRef }                              from 'react'
import { StyleSheet, View, Text, ScrollView, Image }  from 'react-native'
import { KeyboardAwareScrollView }                    from  'react-native-keyboard-aware-scroll-view'
import RegisterForm                                   from '../../components/Account/RegisterForm'
import Toast                                          from 'react-native-easy-toast'

export default function Register() {
  const toastRef = useRef()

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/trip-advisor-logo.png")}
        style={styles.logo}
        rezizeMode="contain"
      />
      <View style={styles.viewForm}>
          <RegisterForm toastRef={toastRef}></RegisterForm>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5}></Toast>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  logo : {
    width    : "100%",
    height   : 150,
    marginTop: 20
  },
  viewForm : {
    marginRight: 40,
    marginLeft : 40
  }
})
