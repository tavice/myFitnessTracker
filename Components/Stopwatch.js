import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Stopwatch = ({ running, onStart, onStop, onFinish }) => {
  // State and refs to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [isInternalRunning, setIsInternalRunning]  = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  // Function to start the stopwatch
  const startStopwatch = () => {
    onStart && onStart();
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setIsInternalRunning(true);
  };
  // Function to pause the stopwatch
  const pauseStopwatch = () => {
    
    clearInterval(intervalRef.current);
    setIsInternalRunning(false);
    // Call onStop prop function if available
    onStop && onStop();
  };
  // Function to reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };
  // Function to resume the stopwatch
  const resumeStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setIsInternalRunning(true);
  };

  //Function to stop the stopwatch
  const handleStopStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
    onFinish && onFinish(elapsedTime);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time}s</Text>
      <View style={styles.buttonContainer}>
        {isInternalRunning ? (
          <TouchableOpacity
            style={[styles.button, styles.pauseButton]}
            onPress={pauseStopwatch}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={startStopwatch}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetStopwatch}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
        {!isInternalRunning && (
          <TouchableOpacity
            style={[styles.button, styles.resumeButton]}
            onPress={resumeStopwatch}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    color: "green",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: "blue",
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  startButton: {
    backgroundColor: "#2ecc71",
    marginRight: 10,
  },
  resetButton: {
    backgroundColor: "#e74c3c",
    marginRight: 10,
  },
  pauseButton: {
    backgroundColor: "#f39c12",
  },
  resumeButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Stopwatch;
