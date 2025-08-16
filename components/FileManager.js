import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Card, Button, TextInput, Portal, Modal } from "react-native-paper";

export default function FileManager({
  users,
  selectedUser,
  setSelectedUser,
  files,
  fileForm,
  setFileForm,
  onSelectImage,
  onUploadImage,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  // Debug: mostrar usuarios cada vez que se abre el selector
  const handleOpenUserMenu = () => {
    console.log("users prop:", users);
    setMenuVisible(true);
  };

  return (
    <View style={styles.fmContainer}>
      <Text style={styles.fmTitle}>
        Archivos de{" "}
        {users?.find((u) => u.id === selectedUser)?.nombre || "Usuario"}
      </Text>

      {/* Selector de usuario */}
      <View style={styles.userSelectContainer}>
        <Button
          mode="outlined"
          onPress={handleOpenUserMenu}
          style={styles.selectUserBtn}
          textColor="#3498DB"
        >
          {users?.find((u) => u.id === selectedUser)
            ? `Usuario: ${users.find((u) => u.id === selectedUser).nombre}`
            : "Seleccionar usuario"}
        </Button>
        <Portal>
          <Modal
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            contentContainerStyle={styles.userSelectModal}
          >
            <Text style={styles.userSelectModalTitle}>
              Selecciona un usuario
            </Text>
            {users && users.length > 0 ? (
              <ScrollView style={{ width: "100%" }}>
                {users.map((user) => (
                  <Card
                    key={user.id}
                    style={styles.userCard}
                    onPress={() => {
                      setSelectedUser(user.id);
                      setMenuVisible(false);
                    }}
                  >
                    <View style={styles.userCardContent}>
                      {user.foto ? (
                        <Image
                          source={{ uri: user.foto }}
                          style={styles.userCardImg}
                        />
                      ) : (
                        <View style={styles.userCardImgPlaceholder}>
                          <Text style={{ color: "#bbb", fontSize: 24 }}>
                            👤
                          </Text>
                        </View>
                      )}
                      <View style={styles.userCardInfo}>
                        <Text style={styles.userCardName}>
                          {user.nombre} {user.apellido}
                        </Text>
                        <Text style={styles.userCardEmail}>{user.correo}</Text>
                      </View>
                    </View>
                  </Card>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noUsersText}>
                No hay usuarios disponibles.
              </Text>
            )}
          </Modal>
        </Portal>
      </View>

      {/* Botón para cargar imagen */}
      <Button
        mode="contained"
        style={styles.fmUploadBtn}
        onPress={() => setModalVisible(true)}
        buttonColor="#3498DB"
        textColor="#fff"
        labelStyle={{ fontWeight: "bold" }}
        disabled={!selectedUser}
      >
        Cargar nueva imagen
      </Button>

      {/* Modal para cargar la imagen */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          contentContainerStyle={styles.bottomSheetModal}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.fmModalTitle}>
              Cargar imagen para{" "}
              {users?.find((u) => u.id === selectedUser)?.nombre}
            </Text>
            <TextInput
              label="Nombre de la imagen"
              value={fileForm.nombre}
              onChangeText={(text) =>
                setFileForm({ ...fileForm, nombre: text })
              }
              style={styles.fmInput}
              theme={{
                colors: {
                  text: "#222",
                  primary: "#3498DB",
                  background: "#fff",
                  placeholder: "#888",
                  onSurface: "#222",
                },
              }}
            />
            <TextInput
              label="Fecha"
              value={fileForm.fecha}
              onChangeText={(text) => setFileForm({ ...fileForm, fecha: text })}
              style={styles.fmInput}
              theme={{
                colors: {
                  text: "#222",
                  primary: "#3498DB",
                  background: "#fff",
                  placeholder: "#888",
                  onSurface: "#222",
                },
              }}
            />
            <Button
              mode="outlined"
              onPress={onSelectImage}
              style={styles.fmSelectBtn}
              textColor="#3498DB"
              labelStyle={{ fontWeight: "bold" }}
            >
              Seleccionar Imagen
            </Button>
            {fileForm.imagen && (
              <Image
                source={{ uri: fileForm.imagen }}
                style={styles.fmPreviewImg}
              />
            )}
            <Button
              mode="contained"
              onPress={() => {
                onUploadImage();
                setModalVisible(false);
              }}
              style={styles.fmUploadBtn}
              buttonColor="#3498DB"
              textColor="#fff"
              labelStyle={{ fontWeight: "bold" }}
            >
              Cargar Imagen
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Lista de imágenes subidas */}
      <Text style={styles.fmSubtitle}>Imágenes subidas:</Text>
      <ScrollView horizontal style={styles.fmCardsScroll}>
        {files.length === 0 && (
          <Text style={styles.fmNoFiles}>No hay imágenes subidas.</Text>
        )}
        {files.map((file, idx) => (
          <Card key={idx} style={styles.fmCard}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ alignItems: "center" }}
            >
              <Image
                source={{ uri: file.imagen || file.uri }}
                style={styles.fmCardImg}
              />
              <Text style={styles.fmCardTitle}>{file.nombre}</Text>
              <Text style={styles.fmCardDate}>{file.fecha}</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fmContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    elevation: 5,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  fmTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3498DB",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  userSelectContainer: {
    marginBottom: 12,
    alignSelf: "center",
  },
  selectUserBtn: {
    borderRadius: 20,
    minWidth: 180,
  },
  userSelectModal: {
    backgroundColor: "white",
    padding: 28,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
  },
  userSelectModalTitle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#3498DB",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  userSelectModalBtn: {
    marginBottom: 6,
  },
  noUsersText: {
    color: "#bbb",
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    marginBottom: 14,
    padding: 10,
    minWidth: 220,
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  userCardImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: "#eee",
  },
  userCardImgPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  userCardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userCardName: {
    fontWeight: "bold",
    color: "#3498DB",
    fontSize: 16,
    marginBottom: 2,
    fontFamily: "Poppins",
  },
  userCardEmail: {
    color: "#888",
    fontSize: 14,
  },
  fmSubtitle: {
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
    color: "#3498DB",
    fontSize: 17,
    textAlign: "left",
  },
  fmUploadBtn: {
    borderRadius: 20,
    marginBottom: 12,
    alignSelf: "center",
    minWidth: 180,
  },
  fmInput: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: 220,
  },
  fmSelectBtn: {
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "center",
    minWidth: 180,
  },
  fmPreviewImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  fmCardsScroll: {
    minHeight: 120,
    paddingVertical: 8,
  },
  fmNoFiles: {
    color: "#bbb",
    fontSize: 15,
    textAlign: "center",
    marginTop: 18,
    fontStyle: "italic",
  },
  fmCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    elevation: 3,
    marginRight: 12,
    padding: 10,
    minWidth: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fmCardImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
  },
  fmCardTitle: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "center",
  },
  fmCardDate: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
  },
  fmModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498DB",
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  bottomSheetModal: {
    backgroundColor: "white",
    padding: 28,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    maxWidth: 600,
    alignSelf: "center",
    alignItems: "center",
  },
});
