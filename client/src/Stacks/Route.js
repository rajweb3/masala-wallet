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

const Route = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Screens.BottomBar}
      >
        <Stack.Screen name={Screens.BottomBar} component={BottomBar} />
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
