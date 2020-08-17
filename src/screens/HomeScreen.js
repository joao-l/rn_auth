import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import {
  AppIcon,
  AppStyles,
} from "../AppStyles";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Inicio",
    headerLeft: () => {
      return (
        <TouchableOpacity onPress={() => { navigation.openDrawer(); }}        >
          {navigation.state.params && navigation.state.params.menuIcon ? (
            <FastImage
              style={styles.userPhoto}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: navigation.state.params.menuIcon }}
            />
          ) : (
              <FastImage
                style={styles.userPhoto}
                resizeMode={FastImage.resizeMode.cover}
                source={AppIcon.images.defaultUser}
              />
            )}
        </TouchableOpacity>
      );
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      user: this.props.user
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ menuIcon: this.props.user.profileURL });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Informações:</Text>
        <Text>{this.props.user.name ? `Nome: ${this.props.user.name}` : ''}</Text>
        <Text>{this.props.user.email ? `Email: ${this.props.user.email}` : ''}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 15
  },
  title: {
    fontFamily: AppStyles.fontName.bold,
    fontWeight: "bold",
    color: AppStyles.color.title,
    marginBottom: 5,
    fontSize: 25
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5
  }
});

export default connect(state => ({ user: state.auth.user }))(HomeScreen);
