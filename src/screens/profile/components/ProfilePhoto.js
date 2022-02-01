import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import ModalButton from '../../../components/buttons/ModalButton';

const propTypes = {
  label: PropTypes.string,
  photoUrl: PropTypes.string,
  onPress: PropTypes.func,
};

class ProfilePhoto extends React.PureComponent {
  render() {
    const {label, photoUrl, onPress} = this.props;
    return (
      <View style={styles.section}>
        <TouchableOpacity onPress={onPress} style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: photoUrl}} />
        </TouchableOpacity>
        <ModalButton onPress={onPress} style={styles.btn} label={label} />
      </View>
    );
  }
}

const imageSize = 96;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PrimaryColors.white,
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btn: {
    paddingVertical: 16,
  },
});

ProfilePhoto.propTypes = propTypes;
export default ProfilePhoto;
