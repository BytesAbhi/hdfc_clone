import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const services = [
  {
    id: 1,
    label: 'UPI Payment',
    image: require('../assets/Images/uip.png'),
  },
  {
    id: 2,
    label: 'Salary Account Services',
    image: require('../assets/Images/sal.png'),
  },
  {
    id: 3,
    label: 'm-Passbook',
    image: require('../assets/Images/pas.png'),
  },
  {
    id: 4,
    label: 'Merchant Standing Instruction',
    image: require('../assets/Images/m.png'),
  },
  {
    id: 5,
    label: 'Smart Account Opening',
    image: require('../assets/Images/s.png'),
  },
  {id: 6, label: 'MyCards', image: require('../assets/Images/c.png')},
  {
    id: 7,
    label: 'ChatBanking on Whatsapp',
    image: require('../assets/Images/w.png'),
  },
  {id: 8, label: 'Ask EVA', image: require('../assets/Images/a.png')},
];

const {width, height} = Dimensions.get('window');

const ServiceCard = ({label, image}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const SectionItem = ({title, onPress}) => (
  <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
    <Text style={styles.itemText}>{title}</Text>
    <Text style={styles.arrow}>&#62;</Text>
  </TouchableOpacity>
);

const Options = ({navigation}) => {
  return (
    <ScrollView style={{paddingBottom: 20}}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Images/lef.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>

        <Text style={{color: '#fff', fontSize: 16}}>More</Text>
        <TouchableOpacity
          style={{
            width: 15,
          }}>
          <Text style={styles.headerIcon}>?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {services.map((service, index) => (
          <View style={styles.row} key={service.id}>
            <ServiceCard label={service.label} image={service.image} />
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <View style={styles.section}>
          <SectionItem
            title="Apply Now"
            onPress={() => console.log('Apply Now Pressed')}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Other HDFC Bank Apps</Text>
        </View>

        <View style={styles.section}>
          <SectionItem
            title="SmartBuy"
            onPress={() => console.log('SmartBuy Pressed')}
          />
          <View style={styles.separator} />
          <SectionItem
            title="PayZapp"
            onPress={() => console.log('PayZapp Pressed')}
          />
          <View style={styles.separator} />
          <SectionItem
            title="Trade with HDFC Securities"
            onPress={() => console.log('Trade with HDFC Securities Pressed')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: '#025395',
    height: height * 0.075,
    width: width * 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  headerImage: {
    height: 25,
    width: 14,
    tintColor: 'white',
  },
  headerIcon: {
    color: '#fff',
    fontSize: 18,
  },
  row: {
    width: width * 0.475,
    backgroundColor: '#F3F3F3',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  card: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  container: {
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden', // Ensures separators align well
    elevation: 2, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 25,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  arrow: {
    fontSize: 20,
    color: '#1E90FF', // Blue arrow color
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
});

export default Options;
