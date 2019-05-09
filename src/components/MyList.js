import React, { Component } from "react";
import { ListView } from "react-native";
import {
  Container,
  Body,
  Left,
  Right,
  Switch,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon
} from "native-base";

export class MyList extends Component {
  deleteRow(secId, rowId, rowMap) {}
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <Container>
        <Content>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={ds.cloneWithRows(this.props.list)}
            renderRow={item => (
              <ListItem>
                <Body>
                  <Text>{item.title}</Text>
                </Body>
                <Right>
                  <Switch
                    value={item.completed}
                    onValueChange={() => {
                      this.props.update(item);
                    }}
                  />
                </Right>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button full onPress={() => alert(data.id)}>
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={_ => this.deleteRow(secId, rowId, rowMap)}
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
        </Content>
      </Container>
    );
  }
}
