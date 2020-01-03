import { createStackNavigator } from "react-navigation-stack";
import searchScreen from '../screens/Search'

const searchScreenStacks = createStackNavigator({
  search: {
    screen           : searchScreen,
    navigationOptions: () => ({
      title: "Busca tu restaurante"
    })
  }
});

export default searchScreenStacks;
