import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { Picker } from "@react-native-picker/picker";

const AddProductScreen = ({ navigation }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discountPercent: "",
    description: "",
    category: "",
    owner: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const source = { uri: response.assets[0].uri };
          setProductData((prev) => ({
            ...prev,
            image: source,
          }));
        }
      }
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!productData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!productData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(productData.price)) {
      newErrors.price = "Price must be a number";
    }

    if (!productData.discountPercent.trim()) {
      newErrors.discountPercent = "Discount is required";
    } else if (
      isNaN(productData.discountPercent) ||
      Number(productData.discountPercent) < 0 ||
      Number(productData.discountPercent) > 100
    ) {
      newErrors.discountPercent = "Discount must be between 0 and 100";
    }

    if (!productData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!productData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!productData.owner.trim()) {
      newErrors.owner = "Owner name is required";
    }

    if (!productData.image) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Product Data:", productData);
      Alert.alert("Success", "Product added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  const Input = ({ label, error, ...props }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Product</Text>
      </View>

      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={styles.imagePickerContainer}
          onPress={pickImage}
        >
          {productData.image ? (
            <Image
              source={productData.image}
              style={styles.selectedImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Tap to add image</Text>
            </View>
          )}
          {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
        </TouchableOpacity>

        <Input
          label="Product Name"
          placeholder="Enter product name"
          value={productData.name}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, name: text }))
          }
          error={errors.name}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <View
            style={[
              styles.pickerContainer,
              errors.category && styles.inputError,
            ]}
          >
            <Picker
              selectedValue={productData.category}
              onValueChange={(value) =>
                setProductData((prev) => ({ ...prev, category: value }))
              }
              style={styles.picker}
            >
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Mountain" value="Mountain" />
              <Picker.Item label="Roadbike" value="Roadbike" />
            </Picker>
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>

        <Input
          label="Discount Percentage"
          placeholder="Enter discount percentage"
          keyboardType="numeric"
          value={productData.discountPercent}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, discountPercent: text }))
          }
          error={errors.discountPercent}
        />

        <Input
          label="Category"
          placeholder="Enter category (Mountain/Roadbike)"
          value={productData.category}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, category: text }))
          }
          error={errors.category}
        />
        <Input
          label="Description"
          placeholder="Enter product description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={productData.description}
          onChangeText={(text) =>
            setProductData((prev) => ({ ...prev, description: text }))
          }
          error={errors.description}
          style={styles.descriptionInput}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Product</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  imagePickerContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    marginBottom: 20,
    overflow: "hidden",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#666",
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: "#FF0000",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  picker: {
    height: 50,
    color: "#333",
  },
});

export default AddProductScreen;
