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
  Modal,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

const {width, height} = Dimensions.get('window');

const CustomAlert = ({message, visible, onClose}) => {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Landing = ({navigation}) => {
  const [activeMethod, setActiveMethod] = useState('fingerprint');
  const [pin, setPin] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleFingerprintLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('Successful biometrics provided');
          navigation.navigate('Home');
        } else {
          console.log('User cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('Biometrics failed');
      });
  };

  const data = [
    {
      id: '1',
      title: 'Open New Account',
      icon: require('../assets/Images/new-account.png'),
      navigation: 'Options',
    },
    {
      id: '2',
      title: 'Offers',
      icon: require('../assets/Images/sale.png'),
      navigation: 'Options',
    },
    {
      id: '3',
      title: 'Home Loan',
      icon: require('../assets/Images/personal.png'),
      navigation: 'Options',
    },
    {
      id: '4',
      title: 'Digital Rupee',
      icon: require('../assets/Images/rupeee.png'),
      navigation: 'Options',
    },
    {
      id: '5',
      title: 'Chat Banking',
      icon: require('../assets/Images/whatsapp.png'),
      navigation: 'Options',
    },
    {
      id: '6',
      title: 'PayZapp',
      icon: require('../assets/Images/money.png'),
      navigation: 'Options',
    },
    {
      id: '7',
      title: 'Ask Eva',
      icon: require('../assets/Images/ask.png'),
      navigation: 'Options',
    },
    {
      id: '8',
      title: 'More',
      icon: require('../assets/Images/menuu.png'),
      navigation: 'Options',
    },
  ];

  const loginMethods = [
    {id: 'fingerprint', label: 'Fingerprint'},
    {id: 'pin', label: '4-Digit PIN'},
    {id: 'password', label: 'Password'},
  ];

  const handleLogin = () => {
    if (!password || password.trim() === '') {
      setAlertVisible(true);
    } else if (password !== '12345678') {
      setAlertVisible(true);
    } else {
      console.log('Password entered:', password);
      navigation.navigate('Home');
    }
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

  const handleAuthenticationAttempt = error => {
    if (error) {
      Alert.alert('Error', 'Authentication failed');
    }
  };

  const GridItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.navigation)}>
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
          marginTop: 25,
          // height: height * 0.075,
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
          {loginMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.LogMethButt,
                activeMethod === method.id && {backgroundColor: '#E1ECF8'},
              ]}
              onPress={() => setActiveMethod(method.id)}>
              <Text style={{textAlign: 'center'}}>{method.label}</Text>
            </TouchableOpacity>
          ))}
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
      <View style={{width: width, marginBottom: 10}}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={4}
          renderItem={({item}) => <GridItem item={item} />}
        />
      </View>
      <CustomAlert
        message={alertMessage}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 1,
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
    borderRadius: 5,
    fontWeight: 400,
  },
  logMethods: {
    borderWidth: 1,
    borderColor: '#1D86FF',
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LogMethButt: {
    paddingVertical: 13,
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
    marginTop: 10,
    fontWeight: '300',
    lineHeight: 12.5,
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
    color: '#000',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#2C8EFF',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
