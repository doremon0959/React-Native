import React, { Component } from "react";
import { View, Text, Card, ListItem } from "react-native-elements";

import { ScrollView, FlatList } from "react-native";
import { baseUrl } from "..shared/baseUrl";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  leaders: state.leaders,
});

const renderLeaderItem = ({ item, index }) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      hideChevron={true}
      leftAvatar={{ source: { uri: baseUrl + item.image } }}
    />
  );
};

function RenderLeader(props) {
  const leader = props.leader;

  if (leader != null) {
    return (
      <Card title="Corporate Leadrship">
        <FlatList
          data={this.props.leaders.leader}
          renderItem={renderLeaderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  } else {
    return <View></View>;
  }
}

class About extends Component {
  static navigationOptions = {
    title: "About Us",
  };
  render() {
    return (
      <ScrollView>
        <Card title="Our History">
          <Text style={{ margin: 10 }}>
            Started in 2010, Ristorante con Fusion quickly established itself as
            a culinary icon par excellence in HongKong. With its unique brand of
            world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong. Featuring four of
            the best three-star Michelin chefs in the world, you never know what
            will arrive on your plate the next time you visit us.
            {"\n"}
            {"\n"}The restaurant traces its humble beginnings to The Frying
            Pan,a successful chain started by our CEO, Mr. Peter Pan, that
            featured for the first time the world's best cuisines in a pan.
          </Text>
        </Card>

        <RenderLeader leader={this.state.leaders} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
