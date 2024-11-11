import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

const BikeShopScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Roadbike" },
    { id: 3, name: "Mountain" },
  ];

  const bikes = [
    {
      id: 1,
      name: "Pinarello",
      price: 1800,
      image: require("../assets/1.png"),
      category: "Mountain",
    },
    {
      id: 2,
      name: "Pina Mountai",
      price: 1700,
      image: require("../assets/2.png"),
      category: "Mountain",
    },
    {
      id: 3,
      name: "Pina Bike",
      price: 1500,
      image: require("../assets/3.png"),
      category: "Roadbike",
    },
    {
      id: 4,
      name: "Pinarello",
      price: 1900,
      image: require("../assets/4.png"),
      category: "Roadbike",
    },
    {
      id: 5,
      name: "Pinarello",
      price: 2700,
      image: require("../assets/5.png"),
      category: "Mountain",
    },
    {
      id: 6,
      name: "Pinarello",
      price: 1350,
      image: require("../assets/6.png"),
      category: "Mountain",
    },
  ];

  const filteredBikes =
    selectedCategory === "All"
      ? bikes
      : bikes.filter((bike) => bike.category === selectedCategory);

  const BikeCard = ({ bike }) => (
    <View style={styles.bikeCard}>
      <TouchableOpacity style={styles.favoriteButton}>
        <Text style={styles.favoriteIcon}>♡</Text>
      </TouchableOpacity>
      <Image
        source={bike.image}
        style={styles.bikeImage}
        resizeMode="contain"
      />
      <Text style={styles.bikeName}>{bike.name}</Text>
      <Text style={styles.bikePrice}>${bike.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>The world's Best Bike</Text>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.name)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bikes Grid */}
      <ScrollView>
        <View style={styles.bikesGrid}>
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
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
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "center",
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryText: {
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  bikesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    justifyContent: "space-around",
  },
  bikeCard: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteButton: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
  favoriteIcon: {
    fontSize: 24,
    color: "#333",
  },
  bikeImage: {
    width: "100%",
    height: 120,
    marginBottom: 8,
  },
  bikeName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  bikePrice: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default BikeShopScreen;
