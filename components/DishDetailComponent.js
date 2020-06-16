import React, { Component } from "react";
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  Modal,
  Button,
  TouchableHighlight,
} from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});
function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <View>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              size={22}
              onPress={() =>
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
              }
            />
          </View>
          <View>
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#4B0082"
              size={22}
              onPress={() => props.toggleModal()}
            />
          </View>
        </View>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>

        <Rating
          imageSize={12}
          readonly
          startingValue={item.rating}
          style={{ margin: 2, alignItems: "flex-start" }}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " +
            item.author +
            ", " +
            new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      comment: "",
      author: "",
      showModal: false,
    };
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  static navigationOptions = {
    title: "Dish Details",
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSubmit(dishId) {
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.toggleModal();
  }

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <>
        <ScrollView>
          <RenderDish
            dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.some((el) => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
            toggleModal={() => this.toggleModal()}
          />
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </ScrollView>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View styles={styles.formRow}>
            <Rating
              type="star"
              showRating
              fractions={1}
              onFinishRating={(value) => this.setState({ rating: value })}
              style={{ paddingVertical: 10 }}
              startingValue={0}
            />
          </View>

          <View styles={styles.formRow}>
            <Input
              placeholder=" Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(value) => this.setState({ author: value })}
            />
          </View>
          <View styles={styles.formRow}>
            <Input
              placeholder=" Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={(value) => this.setState({ comment: value })}
            />
          </View>
          <View>
            <TouchableHighlight
              style={styles.buttonFormWrapping}
              onPress={() => this.handleSubmit(dishId)}
            >
              <Text style={styles.buttonFormText}>Submit</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={{ ...styles.buttonFormWrapping, backgroundColor: "grey" }}
              onPress={() => {
                this.toggleModal();
              }}
            >
              <Text style={styles.buttonFormText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  buttonRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonFormWrapping: {
    backgroundColor: "#512DA8",
    padding: 10,
    borderRadius: 1,
    marginTop: 5,
    shadowColor: "#000",
  },
  buttonFormText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
