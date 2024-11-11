import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchBikes, setSelectedCategory } from "../redux/bikesSlice";

const BikeShopScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, status, error, selectedCategory } = useSelector(
    (state) => state.bikes
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBikes());
    }
  }, [status, dispatch]);

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Roadbike" },
    { id: 3, name: "Mountain" },
  ];

  const calculateDiscountedPrice = (price, discountPercent) => {
    return price - (price * discountPercent) / 100;
  };

  const filteredBikes =
    selectedCategory === "All"
      ? items
      : items.filter((bike) => bike.category === selectedCategory);

  const BikeCard = ({ bike }) => {
    const discountedPrice = calculateDiscountedPrice(
      bike.price,
      bike.discountPercent
    );

    return (
      <TouchableOpacity
        style={styles.bikeCard}
        onPress={() => navigation.navigate("BikeDetail", { bike })}
      >
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            // Handle favorite logic
          }}
        >
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: bike.image }} // Assuming API returns image URL
          style={styles.bikeImage}
          resizeMode="contain"
        />
        <Text style={styles.bikeName}>{bike.name}</Text>
        <Text style={styles.bikePrice}>${discountedPrice.toFixed(0)}</Text>
      </TouchableOpacity>
    );
  };

  if (status === "loading") {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (status === "failed") {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>The world's Best Bike</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => dispatch(setSelectedCategory(category.name))}
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
  addButton: {
    width: 100,
    height: 50,
    backgroundColor: "#E94141",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default BikeShopScreen;
