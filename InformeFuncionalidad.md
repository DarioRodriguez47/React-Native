# Informe de Funcionalidad y Preguntas Técnicas

[Ir al README del proyecto](./README.md)

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Inicia la aplicación con `npx expo start`.
5. Escanea el código QR con Expo Go o usa un emulador para ver la app.

## 1. Descripción General del Proyecto

Este proyecto es una aplicación desarrollada con Expo y React Native. Su estructura incluye componentes para la gestión de personas, actividades y archivos, así como una interfaz moderna y funcional. El proyecto está organizado en carpetas como `components` y `assets`, y cuenta con archivos principales como `App.js` y `package.json`.

## 2. Funcionalidades Implementadas

- **Gestión de Personas:** Permite agregar, editar y visualizar personas mediante formularios y listas.
- **Gestión de Actividades:** Muestra actividades en una lista interactiva.
- **Gestión de Archivos:** Incluye un manejador de archivos y modales para visualizar y administrar documentos.
- **Interfaz de Usuario:** Barra lateral, modales flotantes y secciones informativas.
- **Recursos gráficos:** Imágenes y logos en la carpeta `assets`.

## 3. Estructura de Archivos

- `App.js`: Punto de entrada de la aplicación.
- `components/`: Contiene los componentes reutilizables como formularios, listas y modales.
- `assets/`: Imágenes y recursos gráficos.
- `package.json`: Dependencias y scripts del proyecto.
- `README.md`: Instrucciones y descripción básica.

## 4. Instrucciones de Uso

1. Instalar dependencias con `npm install`.
2. Iniciar la aplicación con `npx expo start`.
3. Acceder desde un emulador o dispositivo físico usando Expo Go.

---

## 5. Preguntas Técnicas sobre React Native

**¿Cuál es la diferencia principal entre React Native y ReactJS?**  
ReactJS se usa para crear aplicaciones web que funcionan en navegadores. React Native se usa para crear aplicaciones móviles nativas (Android/iOS) usando JavaScript, pero genera componentes nativos en vez de HTML.

**Explique cómo funciona el ciclo de vida de un componente en React Native.**  
El ciclo de vida de un componente incluye fases como montaje (cuando se crea), actualización (cuando cambia el estado o las props) y desmontaje (cuando se elimina). Se gestionan con métodos como `useEffect` en componentes funcionales.

**¿Qué es AsyncStorage y en qué casos es recomendable usarlo?**  
AsyncStorage es una API para guardar datos simples de forma local en el dispositivo, como configuraciones o sesiones. Es útil para almacenar información que debe persistir aunque la app se cierre.

**¿Cuál es la diferencia entre usar FlatList y ScrollView en React Native?**  
`ScrollView` muestra todos los elementos a la vez, lo que puede afectar el rendimiento con listas grandes. `FlatList` solo renderiza los elementos visibles y algunos cercanos, siendo más eficiente para listas largas.

---
