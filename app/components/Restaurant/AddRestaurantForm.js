import React, { useState, useEffect }                     from 'react'
import {StyleSheet, View, ScrollView, Alert, Dimensions}  from 'react-native'
import {Icon, Avatar, Image, Input, Button}               from 'react-native-elements'
import * as Permissions                                   from 'expo-permissions'
import * as ImagePicker                                   from 'expo-image-picker'
import MapView                                            from 'react-native-maps'
import Modal                                              from '../Modal'
import * as Location                                      from 'expo-location'
import uuid                                               from 'uuid/v4'
import { firebaseApp }                                    from '../../utils/firebase'
import firebase                                           from 'firebase/app'
import "firebase/firestore"

const db          = firebase.firestore(firebaseApp)
const WidthScreen = Dimensions.get('window').width

export default function AddRestaurantForm (props) {
  const {navigation, toastRef, setIsLoading}               = props
  const [imagesSelected, setImagesSelected]                = useState([])
  const [restaurantName , setRestaurantName]               = useState('')
  const [restaurantAddress , setRestaurantAddress]         = useState('')
  const [restaurantDescription , setRestaurantDescription] = useState('')
  const [isVisibleMap,  setIsVisibleMap ]                  = useState(false)
  const [locationRestaurant, setLocationRestaurant]        = useState(null)

  const addRestaurant = () => {
    if (!restaurantName || !restaurantAddress || !restaurantDescription) toastRef.current.show('Todos los campos del formulario son obligatorios')
    else if (imagesSelected.length === 0) toastRef.current.show('El restaurante tiene que tener por lo menos una foto ')
    else if (!locationRestaurant) toastRef.current.show('Tienes que seleccionar la localizacion en el mapa')
    else {
      setIsLoading(true)
      uploadImagesStorage(imagesSelected).then( arrayImages => {
        db.collection('restaurants').add({
          name          : restaurantName,
          address       : restaurantAddress,
          description   : restaurantDescription,
          location      : locationRestaurant,
          images        : arrayImages,
          rating        : 0,
          quantityVoting: 0,
          createAt      : new Date(),
          createBy      : firebase.auth().currentUser.uid
        }).then(() => {
          setIsLoading(false)
          navigation.navigate('Restaurants')
        }).catch(() => {
          setIsLoading(false)
          toastRef.current.show('Error al subir restaurante, intentelo mas tarde')
        })
      })
    }
  }

  const uploadImagesStorage = async imageArray => {
    const imageBlob = []
    await Promise.all(imageArray.map(async image => {
      const response = await fetch(image)
      const blob     = await response.blob()
      const ref      = firebase.storage().ref('restaurant-images').child(uuid())
      await ref.put(blob).then(result => {
        imageBlob.push(result.metadata.name)
      })
    }))

    return imageBlob
  }

  return (
    <ScrollView>
      <PortadaImage ImageRestaurant = {imagesSelected[0]}/>
      <FormAdd 
        setRestaurantName        = {setRestaurantName}
        setRestaurantAddress     = {setRestaurantAddress}
        setRestaurantDescription = {setRestaurantDescription}
        setIsVisibleMap          = {setIsVisibleMap}
        locationRestaurant       = {locationRestaurant}
      />
      <UploadImage
        imagesSelected    = {imagesSelected}
        setImagesSelected = {setImagesSelected}
        toastRef          = {toastRef}
      />

      <Button
        title       = 'Crear restautante'
        onPress     = {addRestaurant}
        buttonStyle = {styles.btnAddRestaurant}
      />

      <Map 
        isVisibleMap          = {isVisibleMap}
        setIsVisibleMap       = {setIsVisibleMap}
        setLocationRestaurant = {setLocationRestaurant}
        toastRef              = {toastRef}
      />
    </ScrollView>
  )
}

function PortadaImage (props) {
  const {ImageRestaurant} = props

  return (
    <View style = {styles.viewPhoto}>
      {ImageRestaurant ? (
        <Image
          source = {{uri : ImageRestaurant}}
          style  = {{width : WidthScreen, height : 200 }}
        />
      ) : (
        <Image
          source = {require('../../../assets/img/portada-image-placeholder.png') }
          style  = {{width : WidthScreen, height : 200 }}
        />
      )}
    </View>
  )
}

function UploadImage(props) {
  const {imagesSelected, setImagesSelected, toastRef} = props

  const imageSelected = async () => {
    const resultPermissions       = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status
    if (resultPermissionsCamera === 'denied') toastRef.current.show('Es necesario activar los permisos para poder acceder a la galeria de imagenes, activar manualmente en ajustes -> expo -> activar fotos ', 5000)
    else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect       : [4, 3]
      })

      if (result.cancelled) toastRef.current.show('Seleccion de imagenes cancelado', 2000)
      else setImagesSelected([...imagesSelected, result.uri])
    }
  }

  const  removeImage = image => {
    const arrayImages = imagesSelected
    Alert.alert(
      'Eliminar Imagen',
      'Estas seguro de que  deseas remover esta imagen',
      [
        {
          text  : 'Cancelar',
          styles: 'cancel'
        },
        {
          text   : 'Eliminar',
          onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))
        }
      ], { cancelable : false  }
    )
  }

  return (
    <View style={styles.viewImages}>
      {imagesSelected.length < 4 && (
        <Icon
          type           = 'material-community'
          name           = 'camera'
          color          = '#7a7a7a'
          containerStyle = {styles.containerIcon}
          onPress        = {imageSelected}
        />
      )}

      {imagesSelected.map((imageRestaurant, index) => (
        <Avatar
          key     = {index}
          onPress = {() => removeImage(imageRestaurant)}
          style   = {styles.miniatureStyle}
          source  = {{uri: imageRestaurant}}
        />
      ))}
    </View>
  )
}

function FormAdd (props) {
  const { 
    setRestaurantName,
    setRestaurantAddress,
    setRestaurantDescription,
    setIsVisibleMap,
    locationRestaurant } = props

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder    = 'Nombre del restaurante'
        containerStyle = {styles.input}
        onChange       = {e => setRestaurantName(e.nativeEvent.text)}
      />

      <Input
        placeholder    = 'Dirección'
        containerStyle = {styles.input}
        onChange       = {e => setRestaurantAddress(e.nativeEvent.text)}
        rightIcon      = {
          {
            type   : 'material-community',
            name   : 'google-maps',
            color  : locationRestaurant ? '#00a680': '#c2c2c2',
            onPress: () => setIsVisibleMap(true)
          }
        }
      />

      <Input
        placeholder         = 'Descripción del restaurante'
        containerStyle      = {styles.input}
        inputContainerStyle = {styles.textArea}
        multiline           = {true}
        onChange            = {e => setRestaurantDescription(e.nativeEvent.text)}
      />
    
    </View>
  )
}

function Map(props) {
  const {
    isVisibleMap,
    setIsVisibleMap,
    setLocationRestaurant,
    toastRef 
  } = props
  const [location, setLocation]   = useState(null)

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(Permissions.LOCATION)
      const statusPermissions = resultPermissions.permissions.location.status
      if (statusPermissions !== 'granted') toastRef.current.show('Es necesario activar la localizacion para activar manualmente en ajustes -> expo -> activar localizacion ', 5000)
      else {
        const loc = await Location.getCurrentPositionAsync({})
        setLocation({
          latitude      : loc.coords.latitude,
          longitude     : loc.coords.longitude,
          latitudeDelta : 0.001,
          longitudeDelta: 0.001
        })
      }
    })()
  }, [])


  const confirmLocation = () => {
    setLocationRestaurant(location)
    toastRef.current.show('Localizacion guardada correctamente')
    setIsVisibleMap(false)
  }

  return (
    <Modal
      isVisible    = {isVisibleMap}
      setIsVisible = {setIsVisibleMap}
    >
      <View>
          {location && (
            <MapView 
              style             = {styles.mapStyle}
              initialRegion     = {location}
              showsUserLocation = {true}
              onRegionChange    = {region => setLocation(region)}
            >
              <MapView.Marker
                coordinate={
                  {
                    latitude : location.latitude,
                    longitude: location.longitude
                  }
                }
                draggable
              />
            </MapView>
          )}
          <View style = {styles.viewMapBtn}>
            <Button
              title          = 'Guardar Ubicacion'
              onPress        = {confirmLocation}
              containerStyle = {styles.viewMapButtonContainerSave}
              buttonStyle    = {styles.viewMapButtonSave}
            />
            <Button
              title          = 'Cancelar'
              onPress        = {() => setIsVisibleMap(false)}
              containerStyle = {styles.viewMapButtonConatinerCancel}
              buttonStyle    = {styles.viewMapButtonCancel}
            />
          </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewImages : {
    flexDirection: 'row',
    marginLeft   : 20,
    marginRight  : 20,
    marginTop    : 10,
  },
  containerIcon : {
    alignItems     : 'center',
    justifyContent : 'center',
    marginRight    : 12,
    height         : 75,
    width          : 75,
    backgroundColor: '#e3e3e3'
  },
  miniatureStyle : {
    width      : 75,
    height     : 75,
    marginRight: 12
  },
  viewPhoto : {
    alignItems  : 'center',
    height      : 180,
    marginBottom: 20
  },
  viewForm : {
    marginLeft : 10,
    marginRight: 10
  },
  input : {
    marginBottom: 20
  },
  textArea : {
    height : 100,
    width  : '100%',
    padding: 0,
    margin : 0
  },
  mapStyle : {
    width : '100%',
    height: 550
  },
  viewMapBtn : {
    flexDirection : 'row',
    justifyContent: 'center',
    marginTop     : 10
  },
  viewMapButtonContainerSave : {
    paddingRight: 5
  },
  viewMapButtonSave : {
    backgroundColor : '#00a680'
  },
  viewMapButtonConatinerCancel : {
    paddingLeft: 5
  },
  viewMapButtonCancel : {
    backgroundColor: '#a60d0d'
  },
  btnAddRestaurant : {
    backgroundColor: '#00a680',
    margin         : 20
  }
})