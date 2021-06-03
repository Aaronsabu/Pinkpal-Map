import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Location from './src/Location';

const navigator = createStackNavigator({
  Location: Location,
}, {
  initialRouteName: 'Location',
  defaultNavigationOptions: {
    title: 'Map'
  }
});

const App = createAppContainer(navigator);

export default () => {
  return (
      <App /> 
  );
};

