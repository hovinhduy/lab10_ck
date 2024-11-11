import { Text, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// You can import supported modules from npm

// or any files within the Snack
import HomeScreen from "./screnn/Screen01";
import Screen02 from "./screnn/Screen02";
import Screen03 from "./screnn/Screen03";
import Screen021 from "./screnn/Screen02_1";
import Screen031 from "./screnn/Screen03_1";
import AddProductScreen from "./screnn/add";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BikeShop">
        <Stack.Screen
          name="Home"
          r
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen02"
          r
          component={Screen02}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen03"
          r
          component={Screen03}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BikeShop"
          r
          component={Screen021}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BikeDetail"
          r
          component={Screen031}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
