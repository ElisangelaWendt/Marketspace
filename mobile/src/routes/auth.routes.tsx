import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CreateUser } from "../pages/CreateUser";
import { Login } from "../pages/Login";

type AuthRoutes ={
  Login: undefined
  CreateUser: undefined
}

export type AuthNavigatorRoutesProps= NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen} = createNativeStackNavigator()

export function AuthRoutes(){
  return(
    <Navigator screenOptions={{ headerShown: false}}>
      <Screen
      name="Login"
      component={Login}
      />
      <Screen
      name="CreateUser"
      component={CreateUser}
      />
    </Navigator>
  )
}