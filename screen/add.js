import React, { useState, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addBike } from "../redux/bikesSlice";

const AddProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const addStatus = useSelector((state) => state.bikes.addStatus);
  const addError = useSelector((state) => state.bikes.addError);

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

  // Theo dõi trạng thái thêm sản phẩm
  useEffect(() => {
    if (addStatus === "succeeded") {
      Alert.alert("Success", "Product added successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } else if (addStatus === "failed") {
      Alert.alert("Error", addError || "Failed to add product");
    }
  }, [addStatus, addError]);

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission needed",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setProductData((prev) => ({
          ...prev,
          image: result,
        }));
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
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

    if (!productData.category) {
      newErrors.category = "Category is required";
    }

    if (!productData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!productData.image) {
      newErrors.image = "Product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await dispatch(addBike(productData)).unwrap();
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to add product");
      }
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
            // Hiển thị ảnh nếu đã chọn, nếu không sẽ hiển thị một placeholder
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

        <TouchableOpacity
          style={[
            styles.submitButton,
            addStatus === "loading" && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={addStatus === "loading"}
        >
          <Text style={styles.submitButtonText}>
            {addStatus === "loading" ? "Adding..." : "Add Product"}
          </Text>
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
});

export default AddProductScreen;
