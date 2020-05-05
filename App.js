import 'react-native-gesture-handler';
import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screen/Home';
import DetailScreen from './screen/Detail';

// Create the client as outlined in the setup guide
const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh',
});
const Stack = createStackNavigator();

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;
