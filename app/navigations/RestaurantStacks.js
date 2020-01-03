import { createStackNavigator } from "react-navigation-stack";
import restaurantsScreen from "../screens/Restaurants";

const restaurantsScreenStacks = createStackNavigator({
  restaurants: {
    screen           : restaurantsScreen,
    navigationOptions: () => ({
      title: "Restaurantes"
    })
  }
});

export default restaurantsScreenStacks;
