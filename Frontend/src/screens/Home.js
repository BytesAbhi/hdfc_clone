import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');
const Home = () => {
  const [ViewTab, setViewTab] = useState('overview');

  const services = [
    {Image: require('../assets/Images/fingerprint.png'), Name: 'Bill Payment'},
    {
      Image: require('../assets/Images/fingerprint.png'),
      Name: 'Money Transfer',
    },
    {Image: require('../assets/Images/fingerprint.png'), Name: 'Add Payee'},
    {Image: require('../assets/Images/fingerprint.png'), Name: 'Scan & Pay'},
    {Image: require('../assets/Images/fingerprint.png'), Name: 'Recharge'},
    {Image: require('../assets/Images/fingerprint.png'), Name: 'UPI Payment'},
  ];

  const DirectsButtsLinks = [
    {Name: 'Pay', Links: ''},
    {Name: 'Save', Links: ''},
    {Name: 'Invest', Links: ''},
  ];

  return (
    <View style={{backgroundColor: '#E6E6E6', flex: 0, height: height}}>
      <View
        style={{
          backgroundColor: '#025395',
          paddingVertical: 15,
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Image
            source={require('../assets/Images/menu.png')}
            style={{width: 22.5, height: 20, tintColor: 'white'}}
          />
          <Text style={{color: '#fff', fontSize: 16}}>Menu</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
            <Image
              source={require('../assets/Images/question.png')}
              style={{width: 22.5, height: 22.5, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
            <Image
              source={require('../assets/Images/on-off-button.png')}
              style={{width: 22.5, height: 22.5, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: width,
          backgroundColor: '#025395',
          paddingVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}>
        <View
          style={{
            width: width * 0.85,
            marginTop: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={() => setViewTab('overview')}
            style={{alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16}}>OVERVIEW</Text>
            {ViewTab == 'overview' && (
              <View
                style={{
                  height: 2,
                  width: '80%',
                  backgroundColor: '#fff',
                  marginTop: 5,
                }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => setViewTab('fav')}
            style={{alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16}}>FAVOURITE</Text>
            {ViewTab == 'fav' && (
              <View
                style={{
                  height: 2,
                  width: '80%',
                  backgroundColor: '#fff',
                  marginTop: 5,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {ViewTab == 'overview' && (
        <View>
          <View
            style={{
              backgroundColor: '#025395',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                borderRadius: 4,
                backgroundColor: '#fff',
                width: width * 0.95,
                paddingTop: 25,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#444',
                  fontSize: 18,
                  marginLeft: 20,
                  fontWeight: '700',
                  textAlign: 'left',
                  width: '100%',
                }}>
                ACCOUNTS
              </Text>
              <View
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  flexDirection: 'row',
                  width: '95%',
                  marginTop: 15,
                  marginBottom: 25,
                  justifyContent: 'space-between',
                  alignItems:'center'
                }}>
                <View>
                  <Text style={{color: '#025296'}}>Savings</Text>
                  <Text style={{color: '#025296'}}>₹ 0.00 Cr</Text>
                </View>
                <TouchableOpacity style={{width: 15}}>
                  <Image
                    source={require('../assets/Images/lef.png')}
                    style={{
                      height: 20,
                      width: 10.5,
                      tintColor: '#2C8EFF',
                      transform: [{rotate: '180deg'}],
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.limne} />
              <TouchableOpacity
                style={{
                  width: '25%',
                  backgroundColor: '#fff',
                  marginVertical: 5,
                  paddingVertical: 10,
                }}>
                <Text style={{textAlign: 'center', color: '#1D86FF'}}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: width * 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: width * 0.95,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 25,
                borderRadius: 5,
                marginTop: 10,
                rowGap: 25,
              }}>
              {services.map((service, index) => (
                <TouchableOpacity
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={index}>
                  <Image
                    source={service.Image}
                    style={{height: 50, aspectRatio: 1, tintColor: '#4A76A0'}}
                  />
                  <Text>{service.Name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text
              style={{
                width: width,
                marginLeft: 20,
                fontSize: 18,
                marginVertical: 10,
              }}>
              Due Bills
            </Text>
            <View
              style={{
                backgroundColor: '#fff',
                width: width * 0.95,
                paddingVertical: 15,
                alignItems: 'center',
                flexDirection: 'column',
                gap: 10,
                borderRadius:4
              }}>
              <Text style={{textAlign: 'center'}}>
                Register Your Billers and pay all your bills with 2 clicks
              </Text>
              <TouchableOpacity
                style={{
                  width: '80%',
                  backgroundColor: '#1D86FF',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 8,
                }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                  ADD BILLER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: width,
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            {DirectsButtsLinks.map((ButtLink, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: '33%',
                  backgroundColor: '#025296',
                  paddingVertical: 10,
                }}>
                <Text style={{textAlign: 'center', color: '#fff'}}>
                  {ButtLink.Name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {ViewTab == 'fav' && (
        <View
          style={{
            width: width,
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center'}}>Nothing Favorite Added Yet</Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  separator: {
    height: 17.5,
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  limne: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
    opacity:0.2
  },
});
