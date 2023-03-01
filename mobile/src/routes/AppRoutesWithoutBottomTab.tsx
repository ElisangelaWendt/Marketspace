//rotas sem a Bottom tab
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme } from "native-base";
import { CreateAdvert } from "../pages/CreateAdvert";
import { CreateUser } from "../pages/CreateUser";
import { Details } from "../pages/Details";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { BottomTab } from "./BottomTab";

type AppRoutes = {
  Details: undefined
  CreateAdvert: undefined
  BottomTab: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutesWithoutBottomTab() {
  const { colors } = useTheme()

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200]

  return (

      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="BottomTab"
          component={BottomTab}
        />
        <Screen
          name="Details"
          component={Details}
        />
        <Screen
          name="CreateAdvert"
          component={CreateAdvert}
        />
      </Navigator>
  )
}