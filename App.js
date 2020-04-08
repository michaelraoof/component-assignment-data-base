import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("database");

export default class employee extends React.Component {
  state = {
    text: "",
    employees: null
  };

  onUpgrade = () => {
    db.transaction(tx => {
      tx.executeSql("drop table department", []);
      tx.executeSql("drop table employee", []);
    });
  };

  componentDidMount() {
    this.onUpgrade();
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists employee (EmpID integer primary key not null, name text not null, title text not null, phone text not null, email text not null, Dept_id integer, FOREIGN KEY(Dept_id) REFERENCES Department(DeptID));"
      );
    });

    db.transaction(tx => {
      tx.executeSql("create table if not exists department (DepID integer primary key not null, name text);");
    });

    this.onCreate();
  }

  onCreate = () => {
    db.transaction(tx => {
      tx.executeSql("insert into department (name) values (?)", ["Sales"]);
      tx.executeSql("insert into department (name) values (?)", ["Management"]);

      tx.executeSql("select * from department", [], (_, { rows }) => console.log(JSON.stringify(rows._array)));
    });

    db.transaction(tx => {
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["michael", "sales", "012", "michael.com", 1]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["Mohamed", "sales", "012", "michael.com", 1]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["ahmed", "sales", "012", "michael.com", 1]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["soso", "sales", "012", "michael.com", 1]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["koko", "sales", "012", "michael.com", 1]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["hoho", "manager", "012", "michael.com", 2]);
      tx.executeSql("insert into employee (name, title, phone, email, Dept_id) values (?,?,?,?,?)", ["hjhj", "manager", "012", "michael.com", 2]);

      tx.executeSql("select * from employee", [], (_, { rows }) => console.log(JSON.stringify(rows)));
    });
  };

  getEmployees = query => {
    db.transaction(tx => {
      tx.executeSql("select * from employee where name = ?", [query], (_, { rows }) => {
        if (rows.length > 0) {
          this.setState({ employees: rows._array });
        } else this.setState({ employees: null });
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Enter Employee Name</Text>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={text => this.setState({ text })}
            onSubmitEditing={() => {
              this.getEmployees(this.state.text);
              this.setState({ text: "" });
            }}
            placeholder="Search Query"
            style={styles.input}
            value={String(this.state.text)}
          />
        </View>
        <ScrollView style={styles.listArea}>
          {this.state.employees !== null ? (
            this.state.employees.map((employee, key) => (
              <View key={key} style={styles.sectionContainer}>
                <Text>{employee.name}</Text>
                <Text>{employee.title}</Text>
                <Text>{employee.phone}</Text>
                <Text>{employee.email}</Text>
                <Text>{employee.Dept_id}</Text>
              </View>
            ))
          ) : (
            <View style={styles.sectionContainer}>
              <Text style={{ textAlign: "center" }}>Nothing To Show</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },

  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  }
});
