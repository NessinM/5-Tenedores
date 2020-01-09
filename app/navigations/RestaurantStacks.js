import { createStackNavigator }     from "react-navigation-stack";
import RestaurantsScreen            from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen          from '../screens/Restaurants/AddRestaurant'

const restaurantsScreenStacks = createStackNavigator({
  Restaurants: {
    screen           : RestaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes"
    })
  },
  AddRestaurant: {
    screen           : AddRestaurantScreen,
    navigationOptions: () => ({
      title: 'Nuevo Restaurante'
    })
  }
});

export default restaurantsScreenStacks;
