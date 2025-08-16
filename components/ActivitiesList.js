import React, { useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Button, Card, Portal, Modal, IconButton } from "react-native-paper";

export default function ActivitiesList({
  persons,
  userFiles,
  onDeleteUser,
  onDeleteImage,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setConfirmDeleteVisible(true);
  };

  const confirmDeleteUser = async () => {
    if (selectedUser && typeof onDeleteUser === "function") {
      await onDeleteUser(selectedUser.id);
    }
    setConfirmDeleteVisible(false);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      <View style={styles.tableWrap}>
        <View style={styles.tableHeader}>
          <Text style={styles.th}>Nombre</Text>
          <Text style={styles.th}>Apellido</Text>
          <Text style={styles.th}>Imágenes</Text>
          <Text style={styles.th}>Acción</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {persons.length === 0 ? (
            <Text style={styles.noUsers}>No hay usuarios registrados.</Text>
          ) : (
            persons.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.td}>{user.nombre}</Text>
                <Text style={styles.td}>{user.apellido}</Text>
                <Text style={styles.td}>{userFiles[user.id]?.length || 0}</Text>
                <View style={styles.tdAction}>
                  <Button
                    mode="contained"
                    style={[styles.detailsBtn, { backgroundColor: "#2980b9" }]}
                    labelStyle={{ color: "#fff", fontWeight: "bold" }}
                    onPress={() => handleOpenModal(user)}
                    rippleColor="#85C1E9"
                  >
                    Ver detalles
                  </Button>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Modal de detalles de usuario */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={handleCloseModal}
          contentContainerStyle={styles.modal}
        >
          {selectedUser && (
            <View>
              <Text style={styles.modalTitle}>
                Detalles de {selectedUser.nombre} {selectedUser.apellido}
              </Text>
              {selectedUser.correo && (
                <Text style={styles.modalEmail}>{selectedUser.correo}</Text>
              )}
              <Button
                mode="contained"
                style={[styles.deleteUserBtn, styles.deleteUserBtnEnhanced]}
                labelStyle={{
                  color: "#fff",
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
                onPress={handleDeleteUser}
                rippleColor="#F1948A"
              >
                Eliminar usuario y sus imágenes
              </Button>
      {/* Modal de confirmación de eliminación */}
      <Portal>
        <Modal
          visible={confirmDeleteVisible}
          onDismiss={() => setConfirmDeleteVisible(false)}
          contentContainerStyle={[styles.modal, { maxWidth: 400 }]}
        >
          <Text style={styles.modalTitle}>¿Confirmar eliminación?</Text>
          <Text style={{ textAlign: "center", marginBottom: 18 }}>
            ¿Estás seguro de que quieres eliminar a este usuario y todas sus imágenes?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              mode="outlined"
              onPress={() => setConfirmDeleteVisible(false)}
              style={{ marginRight: 12 }}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={confirmDeleteUser}
              buttonColor="#e74c3c"
              textColor="#fff"
            >
              Sí, eliminar
            </Button>
          </View>
        </Modal>
      </Portal>
              <Text style={styles.imagesTitle}>Imágenes cargadas:</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {(userFiles[selectedUser.id] || []).length === 0 ? (
                  <Text style={styles.noImages}>No hay imágenes.</Text>
                ) : (
                  userFiles[selectedUser.id].map((img, idx) => (
                    <Card
                      key={img.id ? `${img.id}` : `img-${idx}`}
                      style={styles.imageCard}
                    >
                      <Image source={{ uri: img.uri }} style={styles.image} />
                      <Text style={styles.imageName}>{img.name}</Text>
                      {img.date && (
                        <Text style={styles.imageDate}>{img.date}</Text>
                      )}
                      <View style={styles.imageActions}>
                        <IconButton
                          icon="delete"
                          iconColor="#e74c3c"
                          onPress={async () => {
                            if (typeof onDeleteImage === "function") {
                              await onDeleteImage(selectedUser.id, img.id);
                            }
                          }}
                        />
                      </View>
                    </Card>
                  ))
                )}
              </ScrollView>
            </View>
          )}
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3498DB",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  tableWrap: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#f5f6fa",
    padding: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 6,
    marginBottom: 6,
  },
  th: {
    flex: 1,
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  td: {
    flex: 1,
    color: "#222",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  tdAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noUsers: {
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    padding: 10,
    fontFamily: "Poppins",
  },
  detailsBtn: {
    borderRadius: 12,
    minWidth: 110,
    fontFamily: "Poppins",
  },
  modal: {
    backgroundColor: "white",
    padding: 28,
    margin: 10,
    borderRadius: 15,
    elevation: 5,
    maxWidth: 600,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3498DB",
    marginBottom: 6,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  modalEmail: {
    color: "#888",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "Poppins",
  },
  deleteUserBtn: {
    borderRadius: 20,
    marginBottom: 12,
    alignSelf: "center",
    minWidth: 180,
  },
  deleteUserBtnEnhanced: {
    backgroundColor: "#e74c3c",
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 2,
    borderColor: "#fff",
    opacity: 0.97,
    // Simulación de gradiente con color de fondo alternativo
  },
  imagesTitle: {
    fontWeight: "bold",
    color: "#3498DB",
    fontSize: 17,
    marginTop: 10,
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  noImages: {
    color: "#bbb",
    fontSize: 15,
    textAlign: "center",
    marginTop: 18,
    fontStyle: "italic",
    flex: 1,
    fontFamily: "Poppins",
  },
  horizontalScroll: {
    alignItems: "center",
    paddingVertical: 10,
  },
  imageCard: {
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 6,
  },
  imageName: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
    marginBottom: 2,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  imageDate: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  imageActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 4,
  },
});
