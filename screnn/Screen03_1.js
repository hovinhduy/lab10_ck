import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

const BikeDetailScreen = ({ route, navigation }) => {
  const { bike } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const calculateDiscountedPrice = (price, discountPercent) => {
    return price - (price * discountPercent) / 100;
  };

  const discountedPrice = calculateDiscountedPrice(
    bike.price,
    bike.discountPercent
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={bike.image}
            style={styles.bikeImage}
            resizeMode="contain"
          />
          <View style={styles.ownerTag}>
            <Text style={styles.ownerText}>{bike.owner}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.bikeName}>{bike.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.discountText}>
              {bike.discountPercent}% OFF | ${discountedPrice.toFixed(0)}
            </Text>
            <Text style={styles.originalPrice}>${bike.price}</Text>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{bike.description}</Text>
          </View>

          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              style={styles.favoriteButton}
            >
              <Text style={styles.favoriteIcon}>{isFavorite ? "♥" : "♡"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                /* Handle add to cart */
              }}
            >
              <Text style={styles.addToCartText}>Add to card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    position: "relative",
    borderWidth: 1,
    borderColor: "#E941411A",
    borderRadius: 8,
    marginBottom: 20,
  },
  bikeImage: {
    width: "100%",
    height: "100%",
  },
  ownerTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#8A2BE2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ownerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsContainer: {
    padding: 16,
  },
  bikeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  discountText: {
    fontSize: 18,
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: "line-through",
    color: "#666",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  favoriteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteIcon: {
    fontSize: 24,
    color: "#FF0000",
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BikeDetailScreen;
