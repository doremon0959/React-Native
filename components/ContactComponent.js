import React, { Component } from "react";
import { View, Text, Card } from "react-native-elements";

import * as Animatable from "react-native-animatable";

class Contact extends Component {
  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card title="Contact information">
          <Text>
            121, Clear Water Bay Road {"\n"}
            {"\n"}
            Clear Water Bay, Kowloon {"\n"}
            {"\n"}
            HONG KONG {"\n"}
            {"\n"}
            Tel: +852 1234 5678{"\n"}
            {"\n"}
            Fax: +852 8765 4321 {"\n"}
            {"\n"}
            Email:confusion@food.net
          </Text>
        </Card>
      </Animatable.View>
    );
  }
}

export default Contact;
