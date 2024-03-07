import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const WorkoutScreen = ({ route }) => {
  const { exerciseData } = route.params;
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(exerciseData.restTime); // Rest time in seconds

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

  return (
    <View>
      <Text>Exercise: {exerciseData.name}</Text>
      <Text>Set: {currentSet} / {exerciseData.sets}</Text>
      {isResting ? (
        <Text>Rest: {timer} seconds</Text>
      ) : (
        <>
          <Text>Reps: {exerciseData.reps}</Text>
          <Button title="Set Completed" onPress={handleSetCompleted} />
        </>
      )}
    </View>
  );
};

export default WorkoutScreen;
