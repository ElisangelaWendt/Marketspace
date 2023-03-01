import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs/lib/typescript/src/types";

import HomeSvg from '../../assets/home.svg'
import TagSvg from '../../assets/Tag.svg'
import LogoutSvg from '../../assets/Logout.svg'
// import HistorySvg from '@assets/history.svg'
// import ProfileSvg from '@assets/profile.svg'
import { useTheme } from "native-base";
import { Platform } from "react-native";
import { Advert } from "../pages/Adverts";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { AuthRoutes } from "./auth.routes";
import { CreateAdvert } from "../pages/CreateAdvert";
import { Details } from "../pages/Details";

type AppRoutes = {
  Home: undefined;
  Advert: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function BottomTab() {

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
      
      
    </Navigator>
  )
}