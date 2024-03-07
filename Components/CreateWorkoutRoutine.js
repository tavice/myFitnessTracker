import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
    <View>
      <Text>Exercise Name:</Text>
      <TextInput
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <Text>Sets:</Text>
      <TextInput
        value={sets.toString()}
        onChangeText={text => setSets(parseInt(text))}
        keyboardType="numeric"
      />
      <Text>Reps:</Text>
      <TextInput
        value={reps.toString()}
        onChangeText={text => setReps(parseInt(text))}
        keyboardType="numeric"
      />
      <Text>Rest Time (seconds):</Text>
      <TextInput
        value={restTime.toString()}
        onChangeText={text => setRestTime(parseInt(text))}
        keyboardType="numeric"
      />
      <Button title="Save Routine" onPress={handleSaveRoutine} />
      <Button title="Cancel Routine" onPress={clearRoutine} />
    </View>
  );
};

export default CreateWorkoutRoutine;
