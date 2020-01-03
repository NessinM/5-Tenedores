import { createStackNavigator } from "react-navigation-stack";
import accountScreen            from '../screens/Account/MyAccount'
import LoginScreen              from '../screens/Account/Login'
import ReguisterScreen          from '../screens/Account/Register'

const accountScreenStacks = createStackNavigator({
  MyAccount: {
    screen           : accountScreen,
    navigationOptions: () => ({
      title: "Mi cuenta"
    })
  },
  Login : {
    screen           : LoginScreen,
    navigationOptions: () => ({
      title: "Login"
    })
  },
  Register : {
    screen           : ReguisterScreen,
    navigationOptions: () => ({
      title: "Resgistrarme"
    })
  },
});

export default accountScreenStacks;
