import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateWorkoutRoutine = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [restTime, setRestTime] = useState(0);

const handleSaveRoutine = () => {
   
    navigation.navigate('Workout', { exerciseData: { name: exerciseName, sets, reps, restTime } });
  };

const clearRoutine = () => {
    setExerciseName('');
    setSets(0);
    setReps(0);
    setRestTime(0);
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Exercise Name:</Text>
      <TextInput
        value={exerciseName}
        onChangeText={setExerciseName}
        style={styles.input}
      />
      <Text style={styles.label}>Sets:</Text>
      <TextInput
        value={sets.toString()}
        onChangeText={text => setSets(parseInt(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Reps:</Text>
      <TextInput
        value={reps.toString()}
        onChangeText={text => setReps(parseInt(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Rest Time (seconds):</Text>
      <TextInput
        value={restTime.toString()}
        onChangeText={text => setRestTime(parseInt(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Save Routine" onPress={handleSaveRoutine} color={'green'} />
      <Button title="Cancel Routine" onPress={clearRoutine} color={'red'}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 15,
    },
  
  });

export default CreateWorkoutRoutine;
