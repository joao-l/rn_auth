import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { AppIcon, AppStyles } from "../AppStyles";
import DrawerContainer from "../components/DrawerContainer";

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Cadastro: { screen: SignupScreen },
    Inicio: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "Inicio",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  });

const HomeStack = createStackNavigator(
  {
    Inicio: { screen: HomeScreen }
  },
  {
    initialRouteName: "Inicio",
    headerMode: "float",
    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Inicio: { screen: HomeStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Inicio") {
          iconName = AppIcon.images.home;
        }

        return (
          <Image
            style={{ tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey }}
            source={iconName}
          />
        );
      }
    }),
    initialLayout: {
      height: 300
    },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      style: { height: 50 }
    }
  }
);

const DrawerStack = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer
  }
);

const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({ color: "black" })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");
const AppNavigator = connect(state => ({ state: state.nav }))(AppWithNavigationState);
const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
    fontFamily: AppStyles.fontName.main
  }
});

export { RootNavigator, AppNavigator, middleware };
