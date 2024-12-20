import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const SavingAccount = () => {
  const [Accdet, setAccdet] = useState('hide');
  const [ActiveReqTab, setActiveReqTab] = useState('email');
  const [ShowState, setShowState] = useState('hide');
  const [isVisible, setIsVisible] = useState(false); // Control popup visibility
  const [dropdownVisible, setDropdownVisible] = useState(null); // Control dropdown visibility
  const [selectedDuration, setSelectedDuration] = useState('Current Month');
  const [selectedFormat, setSelectedFormat] = useState('PDF');

  const durationOptions = ['Current Month', 'Last Month', 'Custom Range'];
  const formatOptions = ['PDF', 'Excel'];

  const Actionsss = [
    {title: 'Open Fixed Deposit', NavigationLink: 'Open Fixed Deposit'},
    {
      title: 'Open Recurring Deposit',
      NavigationLink: 'Open Fixed Deposit',
    },
    {
      title: 'Open Tax Saver Deposit',
      NavigationLink: 'Open Fixed Deposit',
    },
    {title: 'Manage Alerts', NavigationLink: 'Open Fixed Deposit'},
    {title: 'Request Cheque Book', NavigationLink: 'Open Fixed Deposit'},
  ];

  const accountData = [
    {title: 'Account Holders', value: 'ABHISHEK S/O DEEP CHAND'},
    {title: 'Nominee', value: 'RITA'},
    {title: 'Branch', value: 'MANAV CHOWK AMBALA CITY'},
    {title: 'IFSC', value: 'HDFC0003645'},
    {title: 'MMID', value: 'Generate', isButton: true},
    {title: 'Virtual Payment Address', value: 'Register', isButton: true},
    {title: 'Account Balance', value: '₹ 0.00'},
    {title: 'Required Monthly Average Balance', value: '₹ 10,000.00'},
    {title: 'Uncleared Funds', value: '₹ 0.00'},
    {title: 'Amount on Hold', value: '₹ 0.00'},
    {
      title: 'Linked Cards',
      value: ['Card', 'Primary Card', '4355********7133'],
      buttonLabel: 'View Card Details',
    },
    {title: 'Spending Limit', value: '₹ 4,00,000.00'},
  ];

  const transactions = [
    {
      date: '13 Dec 2024',
      description: 'AMB CHRG INCL GST FOR DEC2023-MIR2534700965167',
      refNum: 'MIR2534700965167',
      amount: '₹ 439.09',
      balance: '₹ 0.00',
    },
    {
      date: '12 Dec 2024',
      description:
        'UPI-ROOP KUMAR-paytmqr5kfdug@ptys-YESB0PTMUPI-434798551645-Sent using Paytm U',
      refNum: '434798551645',
      amount: '₹ 90.00',
      balance: '₹ 439.09',
    },
    {
      date: '12 Dec 2024',
      description: 'DEBIT CARD ANNUAL FEE-Oct-2024 281024-MIR2534795469779',
      refNum: 'MIR2534795469779',
      amount: '₹ 590.00',
      balance: '₹ 529.09',
    },
    {
      date: '11 Dec 2024',
      description:
        'UPI-Branch-branchonline@ybl-YESB0YBLUPI-434670231250-Branch Payment',
      refNum: '434670231250',
      amount: '₹ 518.00',
      balance: '₹ 1,119.09',
    },
    {
      date: '11 Dec 2024',
      description: 'AMB CHRG INCL GST FOR NOV2024-MIR2534488154730',
      refNum: 'MIR2534488154730',
      amount: '₹ 581.91',
      balance: '₹ 1,637.09',
    },
  ];

  const handleDropdownSelect = (option, setter) => {
    setter(option);
    setDropdownVisible(null);
  };

  // Function to render the custom dropdown
  const renderDropdown = (options, setter) => (
    <View style={styles.dropdownContainer}>
      <ScrollView>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => handleDropdownSelect(option, setter)}>
            <Text style={styles.dropdownText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView
      style={{
        backgroundColor: '#E6E6E6',
        flex: 0,
        // height: height,
      }}>
      <View
        style={{
          backgroundColor: '#025395',
          paddingVertical: 15,
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: width,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Image
            source={require('../assets/Images/lef.png')}
            style={{width: 10.5, height: 18, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={{color: '#fff', fontSize: 16, fontWeight: '400'}}>
          Saving Account
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
            <Image
              source={require('../assets/Images/question.png')}
              style={{width: 27.5, height: 27.5, tintColor: 'white'}}
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
          paddingVertical: 10,
          width: width * 0.975,
          backgroundColor: '#fff',
          borderRadius: 4,
          marginTop: 7.5,
          marginLeft: width * 0.0125,
        }}>
        <View
          style={{marginLeft: 10, marginBottom: 20, marginTop: 7.5, gap: 5}}>
          <Text style={{fontWeight: '400', fontSize: 14}}>Saving Account</Text>
          <Text style={{fontWeight: '400', fontSize: 14, color: '#868686'}}>
            5010 0465 7472 82
          </Text>
        </View>
        <View style={styles.limne} />
        <View style={{marginLeft: 10, marginTop: 15, marginBottom: 25}}>
          <Text style={{fontWeight: '400', fontSize: 14}}>
            Avilable Balance
          </Text>
          <Text style={{fontWeight: '400', fontSize: 24, color: '#025296'}}>
            <Image
              source={require('../assets/Images/rupee.png')}
              style={{width: 17.5, height: 17.5, tintColor: '#025296'}}
            />
            0
            <Text style={{fontWeight: '400', fontSize: 16, color: '#025296'}}>
              .00
            </Text>
          </Text>
          <Text style={{fontWeight: '400', fontSize: 14}}>
            {'( Account Balance + Overdraft + Hold )'}
          </Text>
        </View>
        <View style={styles.limne} />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          {Accdet == 'hide' && (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
                alignItems: 'flex-start',
                width: '100%',
              }}>
              {accountData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 12,
                    flexDirection: 'row',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={[
                      styles.textdecor,
                      {color: '#999999', width: '45%'},
                    ]}>
                    {item.title}
                  </Text>
                  <View style={{}}>
                    {item.isButton ? (
                      <TouchableOpacity>
                        <Text style={{color: '#2C8EFF'}}>{item.value}</Text>
                      </TouchableOpacity>
                    ) : Array.isArray(item.value) ? (
                      item.value.map((line, idx) => (
                        <Text key={idx} style={{color: '#000000'}}>
                          {line}
                        </Text>
                      ))
                    ) : (
                      <Text style={{color: '#000000', fontWeight: ''}}>
                        {item.value}
                      </Text>
                    )}

                    {/* Additional Button for Linked Cards */}
                    {item.buttonLabel && (
                      <TouchableOpacity>
                        <Text style={{color: '#2C8EFF'}}>
                          {item.buttonLabel}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '50%',
              gap: 15,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            onPress={() => setAccdet(Accdet === 'show' ? 'hide' : 'show')}>
            <Text style={{color: '#1D86FF'}}>
              {Accdet == 'show'
                ? 'Show Account Details'
                : 'Hide Account Details'}
            </Text>
            <Image
              source={require('../assets/Images/lef.png')}
              style={{
                height: 18,
                width: 11,
                tintColor: '#2C8EFF',
                transform: [{rotate: Accdet === 'hide' ? '90deg' : '-90deg'}],
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.limne} />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 25,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '50%',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../assets/Images/share.png')}
              style={{
                height: 25,
                width: 25,
                tintColor: '#2C8EFF',
              }}
            />
            <Text style={{color: '#1D86FF'}}>Show Account Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: width * 0.975,
          marginTop: 20,
          borderRadius: 4,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginLeft: width * 0.0125,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            width: '99%',
            justifyContent: 'space-between',
            paddingVertical: 5,
          }}
          onPress={() => setShowState(ShowState === 'show' ? 'hide' : 'show')}>
          <Text style={{color: '#025296'}}>Statement</Text>
          <Image
            source={require('../assets/Images/lef.png')}
            style={{
              height: 18,
              width: 11,
              tintColor: '#2C8EFF',
              transform: [{rotate: ShowState === 'hide' ? '90deg' : '-90deg'}],
            }}
          />
        </TouchableOpacity>

        {ShowState == 'hide' && (
          <View style={styles.container}>
            <Text style={styles.subHeader}>Recent Transactions</Text>
            <View>
              {transactions.map((item, index) => (
                <View key={index} style={styles.transactionContainer}>
                  <View style={{width: '75%'}}>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.refNum}>Ref Num: {item.refNum}</Text>
                  </View>
                  <Image
                    source={require('../assets/Images/up-arrow.png')}
                    style={{
                      height: 25,
                      width: 25,
                      transform: [{rotate: '45deg'}],
                      tintColor: '#DE3226',
                    }}
                  />
                  <View style={styles.transactionFooter}>
                    <Text style={styles.amount}>{item.amount}</Text>
                    <Text style={styles.balance}>Balance: {item.balance}</Text>
                  </View>
                </View>
              ))}

              <TouchableOpacity style={styles.showMore}>
                <Text style={styles.showMoreText}>Show More</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.requestButton}>
              <Text
                style={styles.requestButtonText}
                onPress={() => setIsVisible(true)}>
                REQUEST STATEMENT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: width * 0.975,
          marginTop: 20,
          borderRadius: 4,
          paddingVertical: 5,
          alignItems: 'center',
          marginLeft: width * 0.0125,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '95%',
            justifyContent: 'space-between',
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text>Protect Against Insufficent Funds</Text>
          <Image
            source={require('../assets/Images/lef.png')}
            style={{
              height: 15,
              width: 8,
              tintColor: '#2C8EFF',
              transform: [{rotate: '180deg'}],
            }}
          />
        </TouchableOpacity>
        <View style={styles.limne} />
        <Text
          style={{
            width: '95%',
            textAlign: '',
            fontSize: 14,
            marginVertical: 20,
          }}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. readable
          content of a page when looking at its layout.
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 20,
          width: width,
          fontSize: 18,
          marginTop: 15,
          marginBottom: 7.5,
        }}>
        Actions
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 10,
          gap: 2.5,
          flexDirection: 'column',
          marginBottom: 10,
          borderRadius: 4,
          width: width * 0.975,
          marginLeft: width * 0.0125,
        }}>
        {Actionsss.map((actions, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: '95%',
                justifyContent: 'space-between',
                paddingVertical: 5,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: '#2C8EFF'}}>{actions.title}</Text>
              <Image
                source={require('../assets/Images/lef.png')}
                style={{
                  height: 15,
                  width: 8,
                  tintColor: '#2C8EFF',
                  transform: [{rotate: '180deg'}],
                }}
              />
            </TouchableOpacity>
            {/* Only display the line if it's not the last item */}
            {index < Actionsss.length - 1 && <View style={styles.limne} />}
          </View>
        ))}
      </View>

      <Modal visible={isVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Account Statement</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#025296',
                flexDirection: 'row',
                overflow: 'hidden',
                borderRadius: 4,
              }}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  paddingVertical: 10,
                  paddingHorizontal: 0,
                  backgroundColor:
                    ActiveReqTab === 'download' ? '#025296' : '#fff',
                }}
                onPress={() => {
                  setActiveReqTab('download');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: ActiveReqTab === 'download' ? '#fff' : '#025296',
                    fontWeight: '600',
                  }}>
                  DOWNLOAD
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '50%',
                  paddingVertical: 10,
                  paddingHorizontal: 0,
                  backgroundColor:
                    ActiveReqTab === 'email' ? '#025296' : '#fff',
                }}
                onPress={() => {
                  setActiveReqTab('email');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: ActiveReqTab === 'email' ? '#fff' : '#025296',
                    fontWeight: ActiveReqTab === 'email' ? '600' : '400',
                  }}>
                  EMAIL
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Duration</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownVisible('duration')}>
              <Text style={styles.selectedText}>{selectedDuration}</Text>
            </TouchableOpacity>
            {dropdownVisible === 'duration' &&
              renderDropdown(durationOptions, setSelectedDuration)}

            <Text style={styles.label}>Format</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setDropdownVisible('format')}>
              <Text style={styles.selectedText}>{selectedFormat}</Text>
            </TouchableOpacity>
            {dropdownVisible === 'format' &&
              renderDropdown(formatOptions, setSelectedFormat)}

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setIsVisible(false)}>
              <Text style={styles.confirmText}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SavingAccount;

const styles = StyleSheet.create({
  limne: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
    opacity: 0.1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0073E6',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    // fontWeight: '600',
    marginBottom: 12,
    color: '#666666',
  },
  transactionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
  refNum: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '100%',
    // backgroundColor: 'red',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0073E6',
  },
  balance: {
    fontSize: 12,
    color: '#444444',
  },
  showMore: {
    alignItems: 'center',
    marginVertical: 12,
  },
  showMoreText: {
    color: '#0073E6',
    fontWeight: '400',
  },
  requestButton: {
    backgroundColor: '#004DA8',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    maxHeight: 120,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#2C8EFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#2C8EFF',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  openButton: {
    backgroundColor: '#2C8EFF',
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});