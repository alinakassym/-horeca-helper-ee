import React from 'react';
import PropTypes from 'prop-types';
import {View, Pressable, StyleSheet} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconProfile} from '../../../assets/icons/tabs/IconProfile';
import PlainButton from '../../../components/buttons/PlainButton';

const propTypes = {
  imageSize: PropTypes.number,
  iconSize: PropTypes.number,
  editable: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

class ProfilePhotoPlaceholder extends React.PureComponent {
  render() {
    const {imageSize, iconSize, editable, onPress, style} = this.props;
    const imgSize = {
      width: imageSize || 96,
      height: imageSize || 96,
    };
    return (
      <Pressable onPress={onPress} style={[styles.section, style]}>
        <View style={[styles.imageWrapper, imgSize]}>
          <IconProfile
            size={iconSize || 36}
            width={1.3}
            color={PrimaryColors.grey2}
          />
        </View>
        {editable && (
          <PlainButton
            onPress={onPress}
            btnStyle={styles.btn}
            label={'Добавить фото'}
          />
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PrimaryColors.white,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.grey4,
  },
  btn: {
    paddingVertical: 16,
  },
});

ProfilePhotoPlaceholder.propTypes = propTypes;
export default ProfilePhotoPlaceholder;
