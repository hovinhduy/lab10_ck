import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import các màn hình
import HomeScreen from "./screen/Screen01";
import Screen021 from "./screen/Screen02";
import Screen031 from "./screen/Screen03";
import AddProductScreen from "./screen/add";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BikeShop"
            component={Screen021}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BikeDetail"
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
    </Provider>
  );
};

export default App;
