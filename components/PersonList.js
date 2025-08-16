import React from "react";
import { View, FlatList, Image, StyleSheet, SafeAreaView } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function PersonList({ personas, onEdit, onDelete, styles }) {
  // Use a StyleSheet for better performance and maintainability
  const componentStyles = StyleSheet.create({
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
    },
    imageContainer: {
      marginRight: 16,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textContainer: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#222",
    },
    cardText: {
      fontSize: 14,
      color: "#555",
    },
    cardActions: {
      justifyContent: "flex-end",
    },
    // The following styles are from the parent component, but included here for clarity
    card: styles?.card,
    contentContainer: {
      paddingBottom: 80,
    },
  });

  const renderItem = ({ item }) => (
    <Card style={componentStyles.card}>
      <View style={componentStyles.cardContent}>
        {item.foto ? (
          <View style={componentStyles.imageContainer}>
            <Image
              source={{ uri: item.foto }}
              style={componentStyles.image}
              resizeMode="cover"
            />
          </View>
        ) : null}
        <View style={componentStyles.textContainer}>
          <Text style={componentStyles.cardTitle}>
            {item.nombre} {item.apellido}
          </Text>
          <Text style={componentStyles.cardText}>Correo: {item.correo}</Text>
        </View>
        <View style={componentStyles.cardActions}>
          <IconButton
            icon="pencil"
            iconColor="#2196f3"
            onPress={() => onEdit(item)}
          />
          <IconButton
            icon="delete"
            iconColor="#f44336"
            onPress={() => onDelete(item.id)}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={componentStyles.contentContainer}
      />
    </SafeAreaView>
  );
}
