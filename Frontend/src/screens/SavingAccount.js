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
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Baseurl} from './Appurl';
import CustomAlert from './CustomAlert';
import DateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('window');

const SavingAccount = ({navigation, route}) => {
  const [Accdet, setAccdet] = useState('show');
  const [ActiveReqTab, setActiveReqTab] = useState('download');
  const [ShowState, setShowState] = useState('show');
  const [visibleTransactions, setVisibleTransactions] = useState(5);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('Current Month');
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({title: '', message: ''});
  const {userDetails, userStatements} = route.params;

  const [fromDate, setFromDate] = React.useState(null); // Start with `null`
  const [toDate, setToDate] = React.useState(null); // Start with `null`
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  console.log(`${toDate} ${fromDate}`);

  const handleDateChange = (event, date, type) => {
    console.log('Raw Event:', event);
    if (date) {
      const formattedDate = new Date(date);
      if (type === 'from') {
        setFromDate(formattedDate); // Store formatted date as string
      } else {
        setToDate(formattedDate); // Store formatted date as string
      }
    }
  };

  // const readableFromDate = fromDate ? fromDate.toDateString() : 'N/A';
  // const readableToDate = toDate ? toDate.toDateString() : 'N/A';



  const handleCustomRangeSelect = () => {
    setFromDate(null);
    setToDate(null);
  };

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
    {title: 'Account Holders', value: userDetails[0].account_holders},
    {title: 'Nominee', value: userDetails[0].nominee},
    {title: 'Branch', value: userDetails[0].branch},
    {title: 'IFSC', value: userDetails[0].ifsc},
    {title: 'MMID', value: userDetails[0].mmid, isButton: true},
    {
      title: 'Virtual Payment Address',
      value: userDetails[0].virtual_payment_address,
      isButton: true,
    },
    {
      title: 'Account Balance',
      value: `₹ ${userStatements.data[userStatements.data.length - 1].balance}`,
    },
    {
      title: 'Required Monthly Average Balance',
      value: `₹ ${userDetails[0].required_monthly_average_balance}`,
    },
    {title: 'Uncleared Funds', value: `₹ ${userDetails[0].uncleared_funds}`},
    {title: 'Amount on Hold', value: `₹ ${userDetails[0].amount_on_hold}`},
    {
      title: 'Linked Cards',
      value: ['Card', 'Primary Card', userDetails[0].linked_cards],
      buttonLabel: 'View Card Details',
    },
    {
      title: 'Spending Limit',
      value: `₹ ${userDetails[0].spending_limit}`,
    },
  ];

  const userId = 2;

  const showAlert = (title, message) => {
    setAlertData({title, message});
    setAlertVisible(true);
  };

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    console.log('Formatted Date:', `${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
  };

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const formattedFromDate = formatDate(fromDate);
      const formattedToDate = formatDate(toDate);

      console.log('Formatted Dates:', formattedFromDate, formattedToDate);

      const url = `${Baseurl}/pdf/${userId}?from=${formattedFromDate}&to=${formattedToDate}`;
      console.log('Downloading from URL:', url);

      const hdfcDir = `${RNFS.DownloadDirectoryPath}/HDFC`;

      if (!(await RNFS.exists(hdfcDir))) {
        await RNFS.mkdir(hdfcDir);
      }

      const fileName = `user-report-${
        new Date().toISOString().split('T')[0]
      }.pdf`;
      const downloadDest = `${hdfcDir}/${fileName}`;

      const options = {
        fromUrl: url,
        toFile: downloadDest,
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        showAlert('Download Complete', `PDF saved to: ${downloadDest}`);
      } else {
        showAlert('Download Failed', 'There was an error downloading the PDF');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showAlert(
        'Download Failed',
        'An error occurred while downloading the PDF',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownSelect = (option, setter) => {
    setter(option);
    setDropdownVisible(null);
  };

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

  const showMoreTransactions = () => {
    setVisibleTransactions(prevVisible => {
      if (prevVisible < 25) {
        return Math.min(prevVisible + 5, 25);
      }
      return prevVisible;
    });
  };

  return (
    <ScrollView
      style={{
        backgroundColor: '#E6E6E6',
        flex: 1,
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
          style={{flexDirection: 'row', alignItems: 'center', gap: 15}}
          onPress={() => navigation.goBack()}>
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
            {
              parseFloat(
                userStatements.data[userStatements.data.length - 1].balance,
              )
                .toFixed(2)
                .split('.')[0]
            }{' '}
            <Text style={{fontWeight: '400', fontSize: 16, color: '#025296'}}>
              .
              {
                parseFloat(
                  userStatements.data[userStatements.data.length - 1].balance,
                )
                  .toFixed(2)
                  .split('.')[1]
              }{' '}
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
                        <Text
                          key={idx}
                          style={{color: '#000000', marginTop: 2.5}}>
                          {line[0].card_number}
                        </Text>
                      ))
                    ) : (
                      <Text style={{color: '#000000', fontWeight: ''}}>
                        {item.value}
                      </Text>
                    )}

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
              {userStatements.data
                .slice(0, visibleTransactions)
                .reverse()
                .map((item, index) => (
                  <View key={index} style={styles.transactionContainer}>
                    <View style={{width: '65%', gap: 5}}>
                      <Text style={styles.date}>{item.date}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                      <Text style={styles.refNum}>Ref Num: {item.ref_num}</Text>
                    </View>
                    <View
                      style={{
                        width: '35%',

                        justifyContent: 'space-between',
                        marginTop: 8,
                        alignItems: 'flex-end',
                        gap: 25,
                      }}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          gap: 7.5,
                        }}>
                        <Text style={styles.amount}>{item.amount}</Text>
                        <Image
                          source={require('../assets/Images/up-arrow.png')}
                          style={{
                            height: 25,
                            width: 25,
                            transform: [{rotate: '45deg'}],
                            tintColor: '#DE3226',
                          }}
                        />
                      </View>
                      <Text style={styles.balance}>
                        Balance: {item.balance}
                      </Text>
                    </View>
                  </View>
                ))}

              <TouchableOpacity
                style={styles.showMore}
                onPress={showMoreTransactions}>
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
              renderDropdown(durationOptions, option => {
                setSelectedDuration(option);
                if (option === 'Custom Range') {
                  handleCustomRangeSelect();
                }
              })}

            {selectedDuration === 'Custom Range' && (
              <View>
                <Text style={styles.label}>From Date</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowFromDatePicker(true)}>
                  <Text style={styles.selectedText}>
                    {fromDate ? fromDate.toDateString() : 'Select Date'}
                  </Text>
                </TouchableOpacity>
                {showFromDatePicker && (
                  <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      setShowFromDatePicker(false);
                      handleDateChange(e, date, 'from');
                    }}
                  />
                )}

                <Text style={styles.label}>To Date</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowToDatePicker(true)}>
                  <Text style={styles.selectedText}>
                    {toDate ? toDate.toDateString() : 'Select Date'}
                  </Text>
                </TouchableOpacity>
                {showToDatePicker && (
                  <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      setShowToDatePicker(false);
                      handleDateChange(e, date, 'to');
                    }}
                  />
                )}
              </View>
            )}

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
              onPress={downloadPDF}>
              <Text style={styles.confirmText}>
                {ActiveReqTab === 'download' ? 'DOWNLOAD PDF' : 'EMAIL PDF'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisible(false)}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />
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

    marginBottom: 12,
    color: '#666666',
  },
  transactionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 7.5,
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
    width: '100%',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '90%',
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
    fontWeight: '600',
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
    width: '100%',
    textAlign: 'center',
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
