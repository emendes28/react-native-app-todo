/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { item } from "../shared/api";
import { MyList } from "./MyList";
import RNEventSource from "react-native-event-source";
import { SearchAdd } from "./SearchAdd";
export default class App extends Component<{}> {
  state = {
    list: [],
    text: ""
  };
  eventSource = {};

  async componentDidMount() {
    this.eventSource = new RNEventSource(item.getEvents);
    await this.setList();
  }

  componentWillUnmount() {
    this.eventSource.removeAllListeners();
    this.eventSource.close();
  }

  async setList() {
    const response = await this.fetchApi(item.get, "GET");
    const list = await response.json();
    this.setState({ list });
  }

  async fetchApi(uri, method, body = undefined, param = "") {
    headers = new Headers({
      "Content-Type": "application/json"
    });
    const requestBody = body ? { method, body, headers } : { method, headers };
    console.log(uri + param, requestBody);
    const response = await fetch(uri + param, requestBody).catch(err =>
      console.error(err)
    );
    console.log(response);

    return response;
  }

  search = async text => {
    this.setState({ text });
    console.log(text);
    const list = this.state.list.filter(element => {
      element.title.indexOf(text) > -1;
    });
    console.log(list);
    this.setState({ list });
  };

  async fetchSSEAndSetList() {
    const list = [];
    this.eventSource.addEventListener("message", data => {
      let item = list.find(item => item.id === data.id);
      if (!item) {
        list.push(data);
      } else {
        item = data;
      }
      this.setState({ list });
    });
  }

  add = async element => {
    await this.fetchApi(item.post, "POST", element, element.id, {
      completed: false,
      title: element
    });
    this.setList();
  };

  updateItem = async element => {
    element.completed = true;
    await this.fetchApi(item.put, "PUT", JSON.stringify(element), element.id);
    this.setList();
  };
  updateStatus = async element => {
    await this.fetchApi(
      item.patch,
      "PATCH",
      JSON.stringify(!element.completed),
      element.id
    );
    this.setList();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchAdd text={this.state.text} search={this.search} />
        </View>
        <View style={styles.itemList}>
          <MyList list={this.state.list} update={this.updateStatus} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  itemList: {
    flexGrow: 3
  },
  searchBar: {
    flexBasis: 40,
    flexGrow: 1,
    flexDirection: "column"
  },
  welcome: {
    fontSize: 20
  }
});
