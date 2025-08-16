import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  LayoutAnimation,
  UIManager,
  ScrollView,
} from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  FAB,
  Text,
  Card,
  Button,
  IconButton,
  Portal,
  Modal,
  TextInput,
} from "react-native-paper";
import Sidebar from "./components/Sidebar";
import PersonList from "./components/PersonList";
import PersonModal from "./components/PersonModal";
import FileManager from "./components/FileManager";
import ActivitiesList from "./components/ActivitiesList";
import AboutSection from "./components/AboutSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import logoNavbar from "./assets/logo-navbar.png";

const PERSONS_KEY = "PERSONS_LIST";
const FILES_KEY = "FILES_LIST";

// Habilitar animaciones en Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  return (
    <PaperProvider>
      <CRUDPersonas />
    </PaperProvider>
  );
}

function CRUDPersonas() {
  const [persons, setPersons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [form, setForm] = useState({ nombre: "", apellido: "", foto: null });
  const [userFiles, setUserFiles] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNav, setSelectedNav] = useState(0);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const personsData = await AsyncStorage.getItem(PERSONS_KEY);
      if (personsData) setPersons(JSON.parse(personsData));

      const filesData = await AsyncStorage.getItem(FILES_KEY);
      if (filesData) setUserFiles(JSON.parse(filesData));
    } catch (e) {
      console.error("Failed to load data from storage", e);
    }
  };

  const savePersons = async (newList) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPersons(newList);
    try {
      await AsyncStorage.setItem(PERSONS_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Failed to save persons data", e);
    }
  };

  const saveFiles = async (newFiles) => {
    setUserFiles(newFiles);
    try {
      await AsyncStorage.setItem(FILES_KEY, JSON.stringify(newFiles));
    } catch (e) {
      console.error("Failed to save files data", e);
    }
  };

  const handleAddOrEdit = () => {
    if (!form.nombre || !form.apellido) return;
    let newList;
    if (editingPerson) {
      newList = persons.map((p) =>
        p.id === editingPerson.id ? { ...editingPerson, ...form } : p
      );
    } else {
      newList = [...persons, { id: Date.now().toString(), ...form }];
    }
    savePersons(newList);
    resetForm();
    setModalVisible(false);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setForm({
      nombre: person.nombre,
      apellido: person.apellido,
      foto: person.foto,
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    const newList = persons.filter((p) => p.id !== id);
    savePersons(newList);
  };

  const handleRemovePhoto = () => {
    setForm({ ...form, foto: null });
  };

  const pickImage = async () => {
    // Solicitar permisos antes de abrir la galería
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a la galería de imágenes.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setForm({ ...form, foto: result.assets[0].uri });
    }
  };

  const resetForm = () => {
    setEditingPerson(null);
    setForm({ nombre: "", apellido: "", foto: null });
  };

  // Lógica de archivos
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleFileUpload = async () => {
    if (!fileName || !selectedUser || !selectedImage) return;
    setUploading(true);
    const newFiles = { ...userFiles };
    const files = newFiles[selectedUser] || [];
    newFiles[selectedUser] = [
      ...files,
      {
        id: Date.now().toString(), // id único para cada imagen
        name: fileName,
        date: new Date().toLocaleDateString(),
        uri: selectedImage,
      },
    ];
    saveFiles(newFiles);
    setFileName("");
    setSelectedImage(null);
    setUploading(false);
  };

  // Eliminar imagen de usuario
  const handleDeleteImage = async (userId, imageId) => {
    const userImages = userFiles[userId] || [];
    const newImages = userImages.filter((img) => img.id !== imageId);
    const newUserFiles = { ...userFiles, [userId]: newImages };
    await saveFiles(newUserFiles);
  };
  const navOptions = [
    { label: "Personas", icon: "account-group" },
    { label: "Archivos", icon: "folder-multiple" },
    { label: "Actividad", icon: "chart-bar" },
    // { label: "Configuración", icon: "cog" },
    { label: "Acerca de", icon: "information" },
  ];

  return (
    <View style={styles.container}>
      {/* Barra superior moderna */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" color="#fff" onPress={() => {}} />
        <Appbar.Content
          title="Gestión de Personas"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>
      <View style={styles.mainRow}>
        {/* Sidebar moderno */}
        <Sidebar
          navOptions={navOptions}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
          hovered={hovered}
          setHovered={setHovered}
          logoNavbar={logoNavbar}
          styles={styles}
        />
        <ScrollView style={styles.content}>
          {selectedNav === 0 && (
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
                Listado de Personas
              </Text>
              <PersonList
                personas={persons}
                onEdit={handleEdit}
                onDelete={handleDelete}
                styles={styles}
              />
              <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {
                  resetForm();
                  setModalVisible(true);
                }}
                color="#fff"
              />
            </View>
          )}
          {selectedNav === 1 && (
            <FileManager
              users={persons}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              files={userFiles[selectedUser] || []}
              fileForm={{
                nombre: fileName,
                fecha: new Date().toLocaleDateString(),
                imagen: selectedImage,
              }}
              setFileForm={({ nombre, fecha, imagen }) => {
                setFileName(nombre);
                // fecha se actualiza automáticamente
                setSelectedImage(imagen);
              }}
              onSelectImage={handlePickImage}
              onUploadImage={handleFileUpload}
              styles={styles}
            />
          )}
          {selectedNav === 2 && (
            <ActivitiesList
              persons={persons}
              userFiles={userFiles}
              onDeleteUser={handleDelete}
              onDeleteImage={handleDeleteImage}
              styles={styles}
            />
          )}
          {selectedNav === 3 && <AboutSection styles={styles} />}
        </ScrollView>
      </View>
      {/* Modal tipo bottom sheet */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            resetForm();
          }}
          contentContainerStyle={styles.bottomSheetModal}
        >
          <PersonModal
            visible={modalVisible}
            onDismiss={() => {
              setModalVisible(false);
              resetForm();
            }}
            persona={editingPerson ? { ...editingPerson, ...form } : form}
            setPersona={setForm}
            onSave={handleAddOrEdit}
            styles={styles}
          />
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    fontFamily: "Poppins",
  },
  header: {
    backgroundColor: "#0D1B2A",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
  },
  mainRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  navSidebar: {
    width: 220,
    backgroundColor: "#1B263B",
    borderRightWidth: 1,
    borderColor: "#1B263B",
    paddingVertical: 32,
    paddingHorizontal: 12,
    alignItems: "center",
    elevation: 2,
    justifyContent: "flex-start",
    zIndex: 9,
  },
  navLogo: {
    width: 90,
    height: 90,
    marginBottom: 32,
    resizeMode: "contain",
  },
  navDrawerWrap: {
    width: "100%",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "transparent",
    transition: "background-color 0.2s",
  },
  navItemHover: {
    backgroundColor: "rgba(46,204,113,0.15)",
    transform: [{ scale: 1.02 }],
  },
  navItemSelected: {
    backgroundColor: "rgba(46,204,113,0.15)",
    borderLeftWidth: 4,
    borderLeftColor: "#2ECC71",
    transform: [{ scale: 1.02 }],
  },
  navItemText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3498DB",
    textAlign: "center",
    letterSpacing: 1,
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    padding: 0,
    fontFamily: "Poppins",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#3498DB",
    borderRadius: 28,
    elevation: 6,
  },
  fabPressed: {
    backgroundColor: "#2176BD",
  },
  archivosContainer: {
    backgroundColor: "#1B263B",
    borderRadius: 18,
    padding: 24,
    marginTop: 24,
    minHeight: 320,
  },
  userSelectWrap: {
    marginBottom: 18,
  },
  userSelectList: {
    flexDirection: "row",
    marginBottom: 8,
  },
  userBtn: {
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 12,
    borderColor: "#3498DB",
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  userBtnSelected: {
    backgroundColor: "#3498DB",
    borderColor: "#2176BD",
  },
  uploadWrap: {
    marginTop: 12,
  },
  uploadFormCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  uploadInput: {
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  uploadDate: {
    color: "#3498DB",
    marginBottom: 8,
    fontWeight: "bold",
    fontFamily: "Poppins",
  },
  uploadBtn: {
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: "flex-start",
    backgroundColor: "#3498DB",
  },
  previewWrap: {
    alignItems: "center",
    marginVertical: 8,
  },
  previewImg: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3498DB",
    marginBottom: 8,
  },
  uploadedImagesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  uploadedImgCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    marginBottom: 12,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    minWidth: 180,
    maxWidth: 240,
  },
  uploadedImg: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#3498DB",
  },
  uploadedImgInfo: {
    flex: 1,
    justifyContent: "center",
  },
  uploadedImgName: {
    fontWeight: "bold",
    color: "#1B263B",
    fontSize: 15,
    marginBottom: 2,
    fontFamily: "Poppins",
  },
  uploadedImgDate: {
    color: "#888",
    fontSize: 13,
    fontFamily: "Poppins",
  },
  bottomSheetModal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    minWidth: 260,
    maxWidth: 320,
    alignSelf: "center",
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
  },
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  th: {
    flex: 1,
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  td: {
    flex: 1,
    color: "#222",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins",
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
});
