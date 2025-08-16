import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Sidebar({
  navOptions,
  selectedNav,
  setSelectedNav,
  hovered,
  setHovered,
  logoNavbar,
  styles,
}) {
  return (
    <View style={styles.navSidebar}>
      <Image source={logoNavbar} style={styles.navLogo} />
      <View style={styles.navDrawerWrap}>
        {navOptions.map((opt, idx) => (
          <TouchableOpacity
            key={opt.label}
            style={[
              styles.navItem,
              hovered === idx && styles.navItemHover,
              selectedNav === idx && styles.navItemSelected,
            ]}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(-1)}
            onPress={() => setSelectedNav(idx)}
          >
            <MaterialCommunityIcons
              name={opt.icon}
              size={24}
              color="#fff"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.navItemText}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
