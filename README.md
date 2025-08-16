# ExamenAppExpo

## Descripción

ExamenAppExpo es una aplicación móvil desarrollada con React Native y Expo, orientada a la gestión de personas y archivos. Permite registrar usuarios, asociarles imágenes y archivos, visualizar actividades y mantener una interfaz moderna y responsiva.

## Requisitos previos

- Node.js (v16 o superior)
- npm (v7 o superior)
- Expo CLI

Si no tienes Expo CLI instalado, ejecuta:

```bash
npm install -g expo-cli
```

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

1. Inicia el proyecto:
   ```bash
   npx expo start
   ```
2. Escanea el código QR con la app Expo Go en tu dispositivo físico, o ejecuta en un emulador Android/iOS.

## Dependencias principales

- react-native
- expo
- react-native-paper
- @react-native-async-storage/async-storage
- expo-image-picker

Si usas emulador, asegúrate de tener Android Studio o Xcode instalado y configurado.

## Estructura del proyecto

```
ExamenAppExpo/
├── App.js
├── app.json
├── index.js
├── package.json
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── logo-navbar.js
│   ├── logo-navbar.png
│   ├── splash-icon.png
│   └── img/
├── components/
│   ├── AboutSection.js
│   ├── ActivitiesList.js
│   ├── FileManager.js
│   ├── FileModal.js
│   ├── FloatingModal.js
│   ├── PersonForm.js
│   ├── PersonItem.js
│   ├── PersonList.js
│   ├── PersonModal.js
│   └── Sidebar.js
```

## Autor

- Lenin Rodriguez
- Fecha: 16 de agosto de 2025

## Licencia

Este proyecto es de uso académico y libre para modificar.
