import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WorkoutScreen = ({ route }) => {
  const { exerciseData } = route.params;
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(exerciseData.restTime); // Rest time in seconds
  const [chronometer, setChronometer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setIsResting(false);
        setCurrentSet(prevSet => prevSet + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, isResting]);

  const handleSetCompleted = () => {
    setIsResting(true);
    setTimer(exerciseData.restTime);
  };

  const handleChronometer = () => {
    setChronometer(chronometer + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textWorkout}>Exercise: {exerciseData.name}</Text>
      <Text style={styles.textWorkout}>Set: {currentSet} / {exerciseData.sets}</Text>
      {isResting ? (
        <Text style={styles.textWorkout}>Rest: {timer} seconds</Text>
      ) : (
        <>
          <Text style={styles.textWorkout}>Reps: {exerciseData.reps}</Text>
          <Button title="Set Completed" onPress={handleSetCompleted} />
        </>

        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
 textWorkout: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default WorkoutScreen;
