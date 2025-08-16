import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TextInput, Button, IconButton, Text, Card } from "react-native-paper";

const PersonForm = ({
  nombre,
  apellido,
  foto,
  onNombreChange,
  onApellidoChange,
  onPickImage,
  onRemovePhoto,
  onSubmit,
  onCancel,
  editing,
}) => (
  <Card>
    <Card.Content>
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={onNombreChange}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Apellido"
        value={apellido}
        onChangeText={onApellidoChange}
        style={styles.input}
        mode="outlined"
      />
      <Button
        icon="image"
        mode="contained"
        onPress={onPickImage}
        style={styles.input}
      >
        Seleccionar Foto
      </Button>
      {foto && (
        <View style={styles.photoPreview}>
          <Image source={{ uri: foto }} style={styles.photoMini} />
          <IconButton icon="delete" onPress={onRemovePhoto} />
        </View>
      )}
    </Card.Content>
    <Card.Actions style={styles.modalButtons}>
      <Button mode="contained" onPress={onSubmit}>
        {editing ? "Guardar" : "Agregar"}
      </Button>
      <Button onPress={onCancel}>Cancelar</Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
  },
  photoPreview: {
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  photoMini: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default PersonForm;
