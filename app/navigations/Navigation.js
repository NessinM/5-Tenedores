import React                        from "react";
import { Icon }                     from "react-native-elements";
import { createAppContainer }       from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import restaurantsScreenStacks      from "./RestaurantStacks";
import topListScreenStacks          from "./TopListStacks"
import searchScreenStacks           from "./SearchStacks"
import accountScreenStacks          from "./AccountStacks"

const NavigationStacks = createBottomTabNavigator({
  restaurants: {
    screen: restaurantsScreenStacks,
    navigationOptions: () => ({
      tabBarLabel: "Restaurantes",
      tabBarIcon : ({ tintColor }) => (
        <Icon
          type="material-community"
          name="compass-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  topLists : {
    screen : topListScreenStacks,
    navigationOptions : () => ({
      tabBarLabel: 'Ranking',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type="material-community"
          name="star-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  search : {
    screen : searchScreenStacks,
    navigationOptions : () => ({
      tabBarLabel: 'Buscar',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type="material-community"
          name="magnify"
          size={22}
          color={tintColor}
        />
      )
    })
  },
  account : {
    screen : accountScreenStacks,
    navigationOptions : () => ({
      tabBarLabel: 'Mi Perfil',
      tabBarIcon : ({tintColor}) => (
        <Icon
          type="material-community"
          name="home-outline"
          size={22}
          color={tintColor}
        />
      )
    })
  }
}, 
{
  initialRouteName: 'account',
  order           : ["restaurants", "topLists", "search", "account"],
  tabBarOptions   : {
    inactiveTintColor: "#646464",
    activeTintColor  : "#00a680"
  }
}
);

export default createAppContainer(NavigationStacks);
