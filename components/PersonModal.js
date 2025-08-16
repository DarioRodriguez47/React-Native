import React from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function PersonModal({
  visible,
  onDismiss,
  persona,
  setPersona,
  onSave,
}) {
  // Función para seleccionar una imagen de la galería.
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la galería de imágenes.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPersona({ ...persona, foto: result.assets[0].uri });
    }
  };

  return (
    <Portal>
      {/* Overlay semitransparente */}
      {visible && <View style={styles.modalOverlay} />}
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContent}
        animationType="slide"
      >
        <View style={styles.container}>
          {/* Título con icono */}
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons
              name="account"
              size={22}
              color="#3498DB"
              style={styles.titleIcon}
            />
            <Text style={styles.modalTitle}>
              {persona?.id ? "Editar Usuario" : "Registrar Usuario"}
            </Text>
          </View>

          {/* Campos de texto con iconos */}
          <View style={styles.inputWrap}>
            <TextInput
              label="Nombre"
              value={persona?.nombre || ""}
              onChangeText={(text) => setPersona({ ...persona, nombre: text })}
              style={styles.textInput}
              left={<TextInput.Icon icon="pencil" color="#888" />}
              theme={{
                colors: {
                  text: "#222",
                  primary: "#3498DB",
                  background: "#fff",
                  placeholder: "#555",
                  onSurface: "#222",
                },
              }}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              label="Apellido"
              value={persona?.apellido || ""}
              onChangeText={(text) =>
                setPersona({ ...persona, apellido: text })
              }
              style={styles.textInput}
              left={<TextInput.Icon icon="pencil" color="#888" />}
              theme={{
                colors: {
                  text: "#222",
                  primary: "#3498DB",
                  background: "#fff",
                  placeholder: "#555",
                  onSurface: "#222",
                },
              }}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              label="Correo"
              value={persona?.correo || ""}
              onChangeText={(text) => setPersona({ ...persona, correo: text })}
              style={styles.textInput}
              left={<TextInput.Icon icon="email" color="#888" />}
              theme={{
                colors: {
                  text: "#222",
                  primary: "#3498DB",
                  background: "#fff",
                  placeholder: "#555",
                  onSurface: "#222",
                },
              }}
            />
          </View>

          {/* Vista previa de foto */}
          <View style={styles.photoContainer}>
            {persona?.foto ? (
              <Image
                source={{ uri: persona.foto }}
                style={styles.modalAvatar}
              />
            ) : (
              <View style={styles.modalAvatarPlaceholder}>
                <MaterialCommunityIcons name="camera" size={24} color="#bbb" />
              </View>
            )}
            <Button
              icon="camera"
              mode={persona?.foto ? "contained" : "outlined"}
              style={styles.photoBtn}
              labelStyle={
                persona?.foto
                  ? styles.photoBtnLabelWhite
                  : styles.photoBtnLabelBlue
              }
              onPress={
                persona?.foto
                  ? () => setPersona({ ...persona, foto: null })
                  : handlePickImage
              }
              buttonColor={persona?.foto ? "#3498DB" : "#fff"}
              textColor={persona?.foto ? "#fff" : "#3498DB"}
            >
              {persona?.foto ? "Quitar Foto" : "Seleccionar Foto"}
            </Button>
          </View>

          {/* Botones finales */}
          <View style={styles.modalActions}>
            <Button
              mode="contained"
              icon="check"
              onPress={onSave}
              style={styles.saveBtn}
              buttonColor="#3498DB"
            >
              Guardar
            </Button>
            <Button
              mode="outlined"
              icon="close"
              onPress={onDismiss}
              style={styles.cancelBtn}
              textColor="#888"
            >
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 28,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    maxWidth: 600,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleIcon: {
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3498DB",
  },
  inputWrap: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#fff",
  },
  photoContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalAvatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  photoBtn: {
    marginTop: 5,
    borderRadius: 20,
  },
  photoBtnLabelWhite: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  photoBtnLabelBlue: {
    color: "#3498DB",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
  },
  cancelBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 20,
  },
});
