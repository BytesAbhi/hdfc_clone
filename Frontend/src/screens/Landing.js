import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const {width, height} = Dimensions.get('window');

const Landing = () => {
  const [activeMethod, setActiveMethod] = useState('fingerprint');
  const [pin, setPin] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleFingerprintLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
  
    rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then((resultObject) => {
        const { success } = resultObject;
  
        if (success) {
          console.log('successful biometrics provided');
          // Handle successful login here
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  // useEffect(() => {
  //   const initFingerprintScanner = async () => {
  //     try {
  //       await FingerprintScanner.isSensorAvailable();
  //     } catch (error) {
  //       console.error('Fingerprint sensor not available:', error);
  //     }
  //   };

  //   initFingerprintScanner();

  //   return () => {
  //     if (FingerprintScanner) {
  //       FingerprintScanner.release();
  //     }
  //   };
  // }, []);

  const data = [
    {
      id: '1',
      title: 'Open New Account',
      icon: require('../assets/Images/new-account.png'),
    },
    {
      id: '2',
      title: 'Offers',
      icon: require('../assets/Images/sale.png'),
    },
    {
      id: '3',
      title: 'Home Loan',
      icon: require('../assets/Images/personal.png'),
    },
    {
      id: '4',
      title: 'Digital Rupee',
      icon: require('../assets/Images/rupeee.png'),
    },
    {
      id: '5',
      title: 'Chat Banking',
      icon: require('../assets/Images/whatsapp.png'),
    },
    {
      id: '6',
      title: 'PayZapp',
      icon: require('../assets/Images/money.png'),
    },
    {
      id: '7',
      title: 'Ask Eva',
      icon: require('../assets/Images/ask.png'),
    },
    {id: '8', title: 'More', icon: require('../assets/Images/menuu.png')},
  ];

  const handleLogin = () => {
    console.log('Password entered:', password);
  };

  const handleForgotPassword = () => {
    console.log('Redirect to Forgot Password');
  };

  const handlePinChange = (value, index) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // const handleFingerprintLogin = () => {
  //   FingerprintScanner.authenticate({onAttempt: handleAuthenticationAttempt})
  //     .then(() =>
  //       Alert.alert('Success', 'Fingerprint authentication successful'),
  //     )
  //     .catch(error => Alert.alert('Error', error.message));
  // };

  const handleAuthenticationAttempt = error => {
    if (error) {
      Alert.alert('Error', 'Authentication failed');
    }
  };

  const GridItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 50,
          padding: 5,
          width: 45,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          alignItems: 'center',
          marginTop: 15,
          height: height * 0.075,
        }}>
        <Image
          source={require('../assets/Images/bankLogo.png')}
          style={{width: '50%', height: 40}}
        />
      </View>

      <View style={styles.card}>
        <Image
          source={require('../assets/Images/Picture.jpg')}
          style={styles.image}
        />
        <Text style={styles.Username}>Welcome, Abhishek S/O Deep Chand</Text>
        <Text style={styles.LogWith}>Log in With</Text>

        <View style={styles.logMethods}>
          <TouchableOpacity
            style={[
              styles.LogMethButt,
              activeMethod === 'fingerprint' && {backgroundColor: '#E1ECF8'},
            ]}
            onPress={() => setActiveMethod('fingerprint')}>
            <Text style={{textAlign: 'center'}}>Fingerprint</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.LogMethButt,
              activeMethod === 'pin' && {backgroundColor: '#E1ECF8'},
            ]}
            onPress={() => setActiveMethod('pin')}>
            <Text style={{textAlign: 'center'}}>4-Digit PIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.LogMethButt,
              activeMethod === 'password' && {backgroundColor: '#E1ECF8'},
            ]}
            onPress={() => setActiveMethod('password')}>
            <Text style={{textAlign: 'center'}}>Password</Text>
          </TouchableOpacity>
        </View>

        {activeMethod === 'fingerprint' && (
          <TouchableOpacity
            style={{
              width: width * 0.89,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1D86FF',
              paddingVertical: 10,
              borderRadius: 10,
              gap: 5,
              marginTop: 15,
              marginBottom: 15,
            }}
            onPress={handleFingerprintLogin}>
            <Image
              source={require('../assets/Images/fingerprint.png')}
              style={{
                height: 32.5,
                width: 32.5,
                borderRadius: 100,
                tintColor: 'white',
              }}
            />
            <Text style={{color: '#fff'}}>Log In With Fingerprint</Text>
          </TouchableOpacity>
        )}

        {activeMethod === 'pin' && (
          <View>
            <View style={styles.pinContainer}>
              {pin.map((value, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.pinBox}
                  value={value}
                  onChangeText={text => handlePinChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPinText}>Forgot PIN?</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeMethod === 'password' && (
          <View style={{width: '90%', marginTop: 15}}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={'#007bff'}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            width: width * 0.89,
            borderTopColor: '#000',
            borderTopWidth: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text>
            Not ABHISHEK S/O DEEPCHAND?{' '}
            <Text
              style={{
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
              }}>
              Use anther account
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 1,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>Secure banking</Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: '80%',
                marginHorizontal: 4,
                backgroundColor: 'black',
              }}></View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>Privecy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: width, height: height * 0.275}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={4}
          renderItem={({item}) => <GridItem item={item} />}
        />
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: width * 1,
    height: height,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#0A1238',
  },
  card: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    columnGap: '0',
    width: width * 0.95,
    backgroundColor: '#f8f8f8',
    paddingVertical: 25,
    paddingHorizontal: 0,
    borderRadius: 15,
    position: 'relative',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    top: '-20%',
  },
  Username: {
    color: 'black',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    fontWeight: 500,
    marginTop: 25,
  },
  LogWith: {
    marginTop: -10,
    marginBottom: 10,
    color: '#8d8d8d',
    fontSize: 12,
    // padding: 10,
    borderRadius: 5,
    fontWeight: 400,
  },
  logMethods: {
    borderWidth: 1,
    borderColor: '#1D86FF',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LogMethButt: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7.5,
    width: '32.25%',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 5,
    backgroundColor: 'white',
    tintColor: 'black',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2.5,
    fontWeight: '300',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pinBox: {
    width: 50,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    backgroundColor: '#FFF',
  },
  forgotPinText: {
    marginTop: 20,
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#A9A9A9',
    fontSize: 16,
    marginBottom: 20,
    paddingBottom: 5,
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 16,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
