import { createStackNavigator } from "react-navigation-stack";
import topRestaurantsScreen from '../screens/TopRestaurants'

const TopListScreenStacks = createStackNavigator({
  topRestaurants : {
    screen           : topRestaurantsScreen,
    navigationOptions: () => ({
      title: 'Restaurantes top'
    })
  }
})

export default TopListScreenStacks;