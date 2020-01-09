import React, {useState}                from 'react'
import { StyleSheet, View, Text }             from 'react-native'
import { Input, Button}                 from 'react-native-elements'
import * as firebase                    from 'firebase'

export default function ChangeDisplayNameForm(props) {
  const {displayName, setIsVisibleModal, setReLoadData, toastRef} = props
  const [newDisplayName, setNewDisplayName]                       = useState(null)
  const [error, setError]                                         = useState(null)
  const [isLoading, setIsLoading]                                 = useState(false)
  const updateDisplayName  = () => {
    setError('')
    if(!newDisplayName) {
      setError('El nombre del usuario no ha cambiado')
    } else {
      setIsLoading(true)
      const upadate = { displayName  : newDisplayName }
      firebase
        .auth().currentUser.updateProfile(upadate)
        .then(() => {
          setIsLoading(false)
          setReLoadData(true)
          toastRef.current.show('Nombre actualzido correctamente')
          setIsVisibleModal(false)
        })
        .catch((error) => {
          setError(`Error al actualizar el nombre : ${error.message}`)
          setIsLoading(false)
        })
    }
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Actualizar Nombre</Text>
      <Input
        placeholder    = 'Nombre'
        containerStyle = {styles.input}
        defaultValue   = {displayName && displayName}
        onChange       = {e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon      = {
          {
            type  : "material-community",
            name  : "account-circle-outline",
            color : '#c2c2c2'
          }
        }
        errorMessage ={error}
      />
      <Button 
        title          = "Actualizar nombre"
        containerStyle = {styles.btnContainer}
        buttonStyle    = {styles.btn}
        onPress        = {updateDisplayName}
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
    backgroundColor : '#00a680'
  },
  headerText : {
    fontSize     : 19,
    paddingTop   : 10,
    paddingBottom: 20,
    fontWeight   : 'bold'
  }
})