import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screens } from "./Screens";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import WalletScreen from "../Screens/WalletScreen";
import TransactScreen from "../Screens/TransactScreen";
import RecoveryScreen from "../Screens/RecoveryScreen";
import ActivityScreen from "../Screens/ActivityScreen";
import { Colors } from "../Constants/Colors";
import InitiateRecoveryScreen from "../Screens/InitiateRecoveryScreen";
import RecoveryPasswordScreen from "../Screens/RecoveryPasswordScreen";
import AuthLoadingScreen from "../Screens/AuthLoadingScreen";
import AuthSuccessScreen from "../Screens/AuthSuccessScreen";
import SplashScreen from "../Screens/SplashScreen";
import StartScreen from "../Screens/StartScreen";
import UserNameScreen from "../Screens/UserNameScreen";
import PasswordScreen from "../Screens/PasswordScreen";
import GuardianScreen from "../Screens/GuardianScreen";
import ConfirmGuardians from "../Screens/ConfirmGuardians";
import LoginScreen from "../Screens/LoginScreen";
import SettingsScreen from "../Screens/SettingsScreen";
import OnBoardingScreen from "../Screens/OnBoardingScreen";
import RecoveryGuardiansScreen from "../Screens/RecoveryGuardiansScreen";

const Route = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Screens.BottomBar}
      >
        <Stack.Screen name={Screens.Splash} component={SplashScreen} />
        <Stack.Screen
          name={Screens.RecoveryGuardians}
          component={RecoveryGuardiansScreen}
        />
        <Stack.Screen name={Screens.OnBoarding} component={OnBoardingScreen} />
        <Stack.Screen name={Screens.Start} component={StartScreen} />
        <Stack.Screen name={Screens.Login} component={LoginScreen} />
        <Stack.Screen name={Screens.Settings} component={SettingsScreen} />
        <Stack.Screen name={Screens.UserName} component={UserNameScreen} />
        <Stack.Screen name={Screens.Password} component={PasswordScreen} />
        <Stack.Screen name={Screens.Guardian} component={GuardianScreen} />
        <Stack.Screen
          name={Screens.ConfirmGuardian}
          component={ConfirmGuardians}
        />

        <Stack.Screen name={Screens.BottomBar} component={BottomBar} />
        <Stack.Screen
          name={Screens.InitiateRecovery}
          component={InitiateRecoveryScreen}
        />
        <Stack.Screen
          name={Screens.RecoveryPassword}
          component={RecoveryPasswordScreen}
        />
        <Stack.Screen
          name={Screens.AuthLoading}
          component={AuthLoadingScreen}
        />
        <Stack.Screen
          name={Screens.AuthSuccess}
          component={AuthSuccessScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;

const BottomBar = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: Colors.yellowLight2 }}
      theme={{ colors: { secondaryContainer: "blue" } }}
    >
      <Tab.Screen
        name={Screens.Wallet}
        component={WalletScreen}
        options={{ tabBarIcon: "circle", tabBarColor: "black" }}
      />

      <Tab.Screen
        name={Screens.Transact}
        component={TransactScreen}
        options={{ tabBarIcon: "circle", tabBarColor: "black" }}
      />
      <Tab.Screen
        name={Screens.Activity}
        component={ActivityScreen}
        options={{ tabBarIcon: "circle", tabBarColor: "black" }}
      />
      <Tab.Screen
        name={Screens.Recovery}
        component={RecoveryScreen}
        options={{ tabBarIcon: "circle", tabBarColor: "black" }}
      />
    </Tab.Navigator>
  );
};
