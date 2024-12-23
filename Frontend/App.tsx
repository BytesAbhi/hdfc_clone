import React, {useEffect, useState, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from './src/screens/Landing';
import Options from './src/screens/Options';
import Home from './src/screens/Home';
import SavingAccount from './src/screens/SavingAccount';
import {Baseurl} from './src/screens/Appurl'; // Base URL: http://10.0.2.2:8000/api/v1
import {View, Animated, StyleSheet} from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userStatements, setUserStatements] = useState(null);
  const [loading, setLoading] = useState(true);

  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (loading) {
      Animated.timing(scaleValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userDetailsResponse, userStatementsResponse] = await Promise.all(
          [fetch(`${Baseurl}/userdetails`), fetch(`${Baseurl}/userstatements`)],
        );

        if (!userDetailsResponse.ok || !userStatementsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const userDetailsData = await userDetailsResponse.json();
        const userStatementsData = await userStatementsResponse.json();

        setUserDetails(userDetailsData);
        setUserStatements(userStatementsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Animated.Image
          source={require('./src/assets/Images/hdfc.png')}
          style={[styles.loaderImage, {transform: [{scale: scaleValue}]}]}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          initialParams={{userDetails, userStatements}}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          initialParams={{userDetails, userStatements}}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavingAccount"
          component={SavingAccount}
          initialParams={{userDetails, userStatements}}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Options"
          component={Options}
          initialParams={{userDetails, userStatements}}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loaderImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
