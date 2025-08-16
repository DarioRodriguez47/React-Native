import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutSection({ styles }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 18,
        elevation: 5,
        padding: 20,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#3498DB",
          marginBottom: 10,
          textAlign: "center",
          fontFamily: "Poppins",
        }}
      >
        Acerca de
      </Text>
      <View
        style={{
          backgroundColor: "#f5f6fa",
          borderRadius: 12,
          padding: 8,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#222",
            marginBottom: 12,
            fontFamily: "Poppins",
          }}
        >
          Esta aplicación fue desarrollada para la gestión de personas y
          archivos, mostrando un ejemplo moderno de interfaz con React Native y
          Expo.
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#222",
            marginBottom: 8,
            fontFamily: "Poppins",
          }}
        >
          Autor: Lenin Dario Rodriguez
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#222",
            fontFamily: "Poppins",
          }}
        >
          Fecha: 16 de agosto de 2025
        </Text>
      </View>
    </View>
  );
}

const aboutStyles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#ffffffff",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
});
