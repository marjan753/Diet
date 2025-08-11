import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Home01Icon ,SpoonAndForkIcon, ProgressIcon,UserIcon} from '@hugeicons/core-free-icons';
import Colors from "./../../apparent/Colors";
import { HeaderShownContext } from '@react-navigation/elements';



export default function Tablayout() {
  return (
   <Tabs  screenOptions={{
    tabBarActiveTintColor:Colors.Primary,
    headerShown:false
   }}>
<Tabs.Screen name='Home' options={{
  tabBarIcon:({color,size}) =>  <HugeiconsIcon
      icon={Home01Icon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />

  }}/>
<Tabs.Screen name='Meals' options={{
  tabBarIcon:({color,size}) =>  <HugeiconsIcon
      icon={SpoonAndForkIcon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />

  }}/>

<Tabs.Screen name='Progress' options={{
  tabBarIcon:({color,size}) =>  <HugeiconsIcon
      icon={ProgressIcon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />

  }}/>


  <Tabs.Screen name='Profile' options={{
  tabBarIcon:({color,size}) =>  <HugeiconsIcon
      icon={UserIcon}
      size={24}
      color="#000000"
      strokeWidth={1.5}
    />

  }}/>
   </Tabs>
  )
}