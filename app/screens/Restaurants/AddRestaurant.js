import React, {useRef, useState}  from 'react'
import {View}                     from 'react-native'
import Toast                      from 'react-native-easy-toast'
import Loading                    from '../../components/Loading'
import AddRestaurantForm          from '../../components/Restaurant/AddRestaurantForm'

export default function AddRestaurant(props) {
  const {navigation}                            = props
  const toastRef                                = useRef()
  const [isVisibleLoading, setIsVisibleLoading] = useState(false)
  return (
    <View>
      <AddRestaurantForm 
        navigation   = {navigation}
        toastRef     = {toastRef}
        setIsLoading = {setIsVisibleLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.5}></Toast>
      <Loading text="Creando restaurante" isVisible={isVisibleLoading}></Loading>
    </View>
  )
}