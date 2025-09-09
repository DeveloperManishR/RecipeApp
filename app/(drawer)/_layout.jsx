import { View, Text } from 'react-native'
import React from 'react'
import { Drawer } from 'expo-router/drawer'
const DrawerLayout = () => {
  return (
    <Drawer>
     
       <Drawer.Screen name="index" options={{title:"Home"}}/>
       {/* <Drawer.Screen name="search" options={{title:"Search"}}/>
       <Drawer.Screen name="favorites" options={{title:"Favorites"}}/> */}
      
    </Drawer>
  )
}

export default DrawerLayout