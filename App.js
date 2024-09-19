import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import removeImg from './assets/close.png'

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState({});
  const [warning, setWarning] = useState(false);

  const handlePress = () => {
    if (task.length === 0) {
      alert("Enter A Task!");
    }
    if (task.length > 25) {
      alert('Task is too long!');
    }else {
      setTasks([...tasks, task]);
      setTask("");
    };
  };

  const crossedOut = (item) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const removeTask = (item) => {
    setTasks(tasks.filter((task) => task !== item));
    setCompletedTasks((prev) => {
      const updated = { ...prev };
      delete updated[item];
      return updated;
    });
  };

  const removeAll = () => {
    if (tasks.length === 0) {
      alert('Already Empty!')
    } else if (!warning) {
      alert("Press again to remove all tasks!");
      setWarning(true);
      console.log(warning);
    } else {
      setTasks([]);
      setCompletedTasks({});
      setWarning(false);
      console.log(warning);
      console.log(tasks);
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToDo List!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={task}
          onChangeText={setTask}
          style={styles.input}
          placeholder="Add a Task:"
        />
        <Button style={styles.button} title="Add" onPress={handlePress} />
      </View>

      <FlatList
        data={tasks}
        style={styles.itemContainer}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => crossedOut(item)}>
              <Text
                style={[
                  styles.inputText,
                  completedTasks[item] && styles.strikethrough,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTask(item)}>
              <Image style={styles.itemButton} source={removeImg} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.bottomContainer}>
        <Button style={styles.remove} title="Remove All" onPress={removeAll} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  text: {
    marginTop: 80,
    fontSize: 20,
    fontWeight: "bold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },

  input: {
    padding: 20,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: 280,
  },

  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    height: 70,
    padding: 20,
    borderWidth: 2,
    borderColor: "black",
    margin: 20,
    borderRadius: 20,
  },

  itemButton: {
    width: 18,
    height: 18
  },

  bottomContainer: {
    marginBottom: 100,
    paddingHorizontal: 20,
  },

  itemContainer: {
    overflowY: "auto",
    marginVertical: 30,
    height: 400,
  },

  inputText: {
    fontSize: 20,
  },

  strikethrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
