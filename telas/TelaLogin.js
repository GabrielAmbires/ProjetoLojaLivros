import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Forma superior */}
      <View style={styles.topShape} />

      {/* Folhas */}
      <Text style={styles.leafTop}>🌿</Text>
      <Text style={styles.leafBottom}>🌿</Text>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Folha Viva</Text>

        <View style={styles.logoBox}>
          <Text style={styles.logoEmoji}>🌱</Text>
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Forma inferior */}
      <View style={styles.bottomShape} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4D5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  topShape: {
    width: 220,
    height: 140,
    backgroundColor: "#105666",
    position: "absolute",
    top: -40,
    right: -60,
    borderRadius: 100,
  },

  bottomShape: {
    width: 220,
    height: 140,
    backgroundColor: "#839958",
    position: "absolute",
    bottom: -50,
    left: -60,
    borderRadius: 100,
  },

  leafTop: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 22,
  },

  leafBottom: {
    position: "absolute",
    bottom: 40,
    right: 20,
    fontSize: 22,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 34,
    color: "#4E6A47",
    fontWeight: "bold",
    marginBottom: 20,
  },

  logoBox: {
    width: 90,
    height: 90,
    backgroundColor: "#E9C3A2",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "45deg" }],
  },

  logoEmoji: {
    fontSize: 40,
    transform: [{ rotate: "-45deg" }],
  },

  form: {
    width: "80%",
  },

  label: {
    color: "#0A3323",
    marginBottom: 5,
    marginLeft: 5,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
  },

  button: {
    backgroundColor: "#D3968C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});