
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ArtistCard = ({ artist, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: artist.image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>
                {artist.name}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginRight: 15,
        width: 100,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 45, // Circular image
        marginBottom: 8,
        borderWidth: 2,
        borderColor: "#FF7000",
    },
    name: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center",
    },
});

export default ArtistCard;
