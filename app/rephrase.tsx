import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RephraseScreen() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRephrase = async () => {
    if (!text.trim()) return;
  
    setLoading(true);
    setOutput("");
  
    try {
        const response = await fetch("https://theresa-unsentient-flavia.ngrok-free.dev/rephrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
  
      const data = await response.json();
      setOutput(data.rephrasedText || "No rephrased text returned.");
    } catch (error) {
      console.error("Rephrase error:", error);
      setOutput("Error connecting to backend.");
    } finally {
      // ✅ this always runs — success or error
      setLoading(false);
    }
  };;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rephrase My Text</Text>

      <TextInput
        style={styles.input}
        placeholder="Type something to rephrase..."
        multiline
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={handleRephrase}>
        <Text style={styles.buttonText}>{loading ? "Rephrasing..." : "Rephrase"}</Text>
      </TouchableOpacity>

      {output ? (
        <View style={styles.outputBox}>
          <Text style={styles.outputText}>{output}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    minHeight: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  outputBox: {
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  outputText: { color: "#fff", fontSize: 16 },
});