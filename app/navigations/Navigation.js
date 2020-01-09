import React                        from "react";
import { Icon }                     from "react-native-elements";
import { createAppContainer }       from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import restaurantsScreenStacks      from "./RestaurantStacks";
import topListScreenStacks          from "./TopListStacks"
import searchScreenStacks           from "./SearchStacks"
import accountScreenStacks          from "./AccountStacks"

const NavigationStacks = createBottomTabNavigator({
  Restaurants: {
    screen           : restaurantsScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Restaurantes",
      tabBarIcon : ({ tintColor }) => (
        <Icon
          type  = "material-community"
          name  = "compass-outline"
          size  = {22}
          color = {tintColor}
        />
      )
    })
  },
  TopLists : {
    screen           : topListScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: 'Ranking',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type  = "material-community"
          name  = "star-outline"
          size  = {22}
          color = {tintColor}
        />
      )
    })
  },
  Search : {
    screen           : searchScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: 'Buscar',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type  = "material-community"
          name  = "magnify"
          size  = {22}
          color = {tintColor}
        />
      )
    })
  },
  Account : {
    screen           : accountScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: 'Mi Perfil',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type  = "material-community"
          name  = "home-outline"
          size  = {22}
          color = {tintColor}
        />
      )
    })
  }
}, 
{
  initialRouteName: 'Restaurants',
  order           : ["Restaurants", "TopLists", "Search", "Account"],
  tabBarOptions   : {
    inactiveTintColor: "#646464",
    activeTintColor  : "#00a680"
  }
}
);

export default createAppContainer(NavigationStacks);
