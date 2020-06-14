import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { baseUrl } from "..shared/baseUrl";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
});

class Menu extends Component {
  static navigationOptions = {
    title: "Menu",
  };
  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate("Dishdetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };
    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
