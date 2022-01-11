import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  VirtualizedList,
  StyleSheet,
  Pressable,
} from 'react-native';
import _ from 'lodash';

// styles
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconClose} from '../../assets/icons/main/IconClose';

// components
import Header from '../Header';
import SearchInput from '../SearchInput';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  items: PropTypes.array,
  itemKey: PropTypes.string,
  onSelect: PropTypes.func,
  onClear: PropTypes.func,
};

class Autocomplete extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log({props});
    this.state = {
      searchText: '',
      visible: false,
      filteredList: props.items,
    };
  }
  render() {
    const {label, value, items, itemKey, onSelect, onClear} = this.props;
    const {searchText, visible, filteredList} = this.state;

    const saveHandler = selectedItem => {
      onSelect(selectedItem);
      this.setState({
        ...this.state,
        searchText: '',
        filteredList: items,
        visible: false,
      });
    };

    const clearValue = () => {
      onClear(null);
      this.setState({...this.state, visible: false});
    };

    const ValueSection = () => {
      return (
        <View style={styles.block}>
          <Text style={styles.label}>{label}</Text>
          <Pressable
            onPress={() => {
              this.setState({...this.state, visible: true});
            }}>
            <Text style={styles.valueText}>{value[itemKey]}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              clearValue();
            }}
            style={styles.clearBtn}>
            <IconClose size={20} color={PrimaryColors.grey1} />
          </Pressable>
        </View>
      );
    };

    const PlaceHolder = () => {
      return (
        <View style={styles.blockPlaceholder}>
          <Pressable
            onPress={() => {
              this.setState({...this.state, visible: true});
            }}>
            <Text style={styles.placeholderText}>{label}</Text>
          </Pressable>
        </View>
      );
    };

    const getItemCount = () => {
      return filteredList.length;
    };

    const getItem = (filteredList, index) => ({
      id: filteredList[index].id,
      title: filteredList[index].title,
      title_ru: filteredList[index].title_ru,
    });

    const getFilteredList = sText => {
      if (sText && sText.length >= 1) {
        const val = _.filter(items, el =>
          _.startsWith(el.title.toLowerCase(), sText.toLowerCase()),
        );
        console.log({val});
        this.setState({...this.state, searchText: sText, filteredList: val});
      } else {
        this.setState({...this.state, searchText: sText, filteredList: items});
      }
    };

    const Item = ({item}) => (
      <Pressable
        onPress={() => {
          saveHandler(item);
        }}
        style={styles.item}>
        <Text style={styles.itemTitle}>{item[itemKey]}</Text>
      </Pressable>
    );

    return (
      <React.Fragment>
        {value ? <ValueSection /> : <PlaceHolder />}
        <Modal visible={visible} animationType="slide" transparent={false}>
          <Header
            goBack
            onClose={() => {
              this.setState({
                ...this.state,
                filteredList: items,
                visible: false,
                searchText: '',
              });
            }}
            title={label}
          />
          <SearchInput
            text={searchText}
            onClear={() => {
              this.setState({
                ...this.state,
                filteredList: items,
                searchText: '',
              });
            }}
            onChangeText={val => {
              getFilteredList(val);
            }}
            onEndEditing={() => {
              console.log('');
            }}
          />
          <VirtualizedList
            data={filteredList}
            renderItem={({item, index}) => <Item index={index} item={item} />}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    position: 'relative',
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.element,
  },
  label: {
    marginBottom: 6,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: PrimaryColors.grey1,
  },
  valueText: {
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  blockPlaceholder: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.grey3,
  },
  placeholderText: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.grey2,
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  itemTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});

Autocomplete.propTypes = propTypes;
export default Autocomplete;
