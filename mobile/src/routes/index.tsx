// import { Loading } from "@components/Loading";
// import { AuthContext } from "@contexts/AuthContext";
// import { useAuth } from "@hooks/useAuth";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { useContext } from "react";
import { Loading } from "../components/Loading";
import { Login } from "../pages/Login";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
// import { AuthRoutes } from "./auth.routes";

export function Routes() {

  const { colors } = useTheme()

  // const {user, isLoadingUserStorageData} = useAuth()
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200]

  // if(isLoadingUserStorageData){
  //   return <Loading/>
  // }
  return (
    // box é usado para qunado for trocar de uma tela para a outra não aparecer a tela branca
    <Box flex={1} bg='gray.200'>
      <NavigationContainer theme={theme}>
        <AppRoutes />
        {/* {user.id ? <AppRoutes/> : <AuthRoutes/> } */}

      </NavigationContainer>
    </Box>
  )
}