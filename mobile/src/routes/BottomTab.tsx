import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import LogoutSvg from '../../assets/Logout.svg'

import HomeSvg from '../../assets/home.svg'
import TagSvg from '../../assets/Tag.svg'
// import HistorySvg from '@assets/history.svg'
// import ProfileSvg from '@assets/profile.svg'
import { useTheme } from "native-base";
import { Platform, TouchableOpacity } from "react-native";
import { Advert } from "../pages/Adverts";
import { Home } from "../pages/Home";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { AuthNavigatorRoutesProps, AuthRoutes } from "./auth.routes";


type AppRoutes = {
  Home: undefined;
  Advert: undefined;
  AuthRoutes:undefined
}



export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function BottomTab() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { sizes, colors } = useTheme()

  const iconSizes = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto': 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[6]
      }
    }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSizes} height={iconSizes} />
          )
        }}
      />
      <Screen
        name="Advert"
        component={Advert}
        options={{
          tabBarIcon: ({ color }) => (
            <TagSvg fill={color} width={iconSizes} height={iconSizes} />
          )
        }}
      />
      <Screen
        name="AuthRoutes"
        component={AuthRoutes}
        
        options={{
          tabBarStyle: { display:'none'} , // serve para não aparecer a tab bar 
          tabBarIcon: ({ color }) => ( <LogoutSvg  width={iconSizes} height={iconSizes} />),
          
        }}
      />
      {/* <Screen
      name="AuthRoutes"
        component={AuthRoutes}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity onPress={(props) => {
              setativo('none')
              navigation.navigate('AuthRoutes')
            }}>
               <LogoutSvg  width={iconSizes} height={iconSizes} />
            </TouchableOpacity>
          ),
        }}
      /> */}
    </Navigator>
  )
}