import React, { useState, useEffect}    from 'react'
import { StyleSheet, View, Text}        from 'react-native'
import { Avatar}                        from 'react-native-elements'
import * as firebase                    from 'firebase'
import * as Permissions                 from 'expo-permissions'
import * as ImagePicker                 from 'expo-image-picker'

export default function InfoUser(props) {
  const {
    userInfo,
    userInfo :  {uid, displayName, email, photoURL},
    setReLoadData,
    toastRef,
    setIsLoading,
    setTextLoading
  } = props


  const changeAvatar =  async () => {
    const resultPermissions       = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status

    if (resultPermissionsCamera === 'denied') {
      toastRef.current.show('Es necesario aceptar los permisos de la galeria')
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect       : [4, 3]
      });

      if (result.cancelled) {
        toastRef.current.show('Has cerrado la galeria de imagenes')
      } else {
        uploadImage(result.uri, uid).then(() => {
          updatePhotoUrl(uid)
        })
      }
    }
  }

  const uploadImage = async (uri, nameImage) => {
    setTextLoading('Actualizando avatar')
    setIsLoading(true)
    const response = await fetch(uri);
    const blob     = await response.blob()
    const ref      = firebase.storage().ref().child(`avatar/${nameImage}`)
    return ref.put(blob)
  }

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = { photoURL  : result }
        await firebase.auth().currentUser.updateProfile(update)
        setReLoadData(true)
        setIsLoading(false)
      })
      .catch(() => {
        toastRef.current.show('Error al recuperar el avatar del servidor')
      })
  }
  return (
    <View style={styles.viewUserinfo}>
      <Avatar
        rounded
        showEditButton
        size           = "large"
        onEditPress    = {changeAvatar}
        containerStyle = {styles.userInfoAvatar}
        source         = {{url : photoURL ? photoURL : 'https://api.adorable.io/avatars/204/abott@adorable.png'}}
      />
      
      <View>
        <Text style={styles.displayName}> {displayName ? displayName : 'Anónimo'} </Text>
        <Text style={styles.email}> {email ? email : 'Social Login'} </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
  viewUserinfo : {
    alignItems     : 'center',
    justifyContent : 'center',
    flexDirection  : 'row',
    backgroundColor: '#f2f2f2',
    paddingTop     : 30,
    paddingBottom  : 30,
  },
  userInfoAvatar : {
    marginRight: 20
  },
  displayName :{
    fontSize  : 16,
    fontWeight: 'bold'
  },
  email : {
    color: '#ccc'
  }
})