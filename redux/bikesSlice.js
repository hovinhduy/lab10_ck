import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create async thunk for fetching bikes
export const fetchBikes = createAsyncThunk("bikes/fetchBikes", async () => {
  const response = await axios.get(
    "https://6715fe1c33bc2bfe40bbdd99.mockapi.io/products"
  );
  return response.data;
});

// Create async thunk for adding a bike
export const addBike = createAsyncThunk(
  "bikes/addBike",
  async (productData) => {
    try {
      // Tạo FormData để gửi cả dữ liệu và hình ảnh
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("discountPercent", productData.discountPercent);
      formData.append("description", productData.description);
      formData.append("category", productData.category);

      // Xử lý file hình ảnh
      const imageUri = productData.image.uri;
      const filename = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      formData.append("image", {
        uri: imageUri,
        name: filename,
        type,
      });

      const response = await axios.post(
        "https://6715fe1c33bc2bfe40bbdd99.mockapi.io/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const bikesSlice = createSlice({
  name: "bikes",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedCategory: "All",
    addStatus: "idle", // Thêm trạng thái cho việc thêm sản phẩm
    addError: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Xử lý thêm sản phẩm mới
      .addCase(addBike.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(addBike.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addBike.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.error.message;
      });
  },
});

export const { setSelectedCategory } = bikesSlice.actions;
export default bikesSlice.reducer;
