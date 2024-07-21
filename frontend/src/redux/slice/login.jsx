import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { is } from "immutable";

const initialState = {
    data: JSON.parse(localStorage.getItem('userData')) || null,
    isLoading: false,
    isError: null,
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
};

// Action creators
export const loginUser = createAsyncThunk("loginUser", async (data, {rejectWithValue}) => {
    try{
        const response = await fetch("http://localhost:5096/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if(!response.ok){
            return rejectWithValue('Invalid credentials');
        }

        const jsonData = await response.json();
        return jsonData;
    }
    catch(error){
        return rejectWithValue(error);
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logoutUser: (state, action) => {
            state.data = null;
            state.isLoggedIn = false;
            // localStorage.removeItem('userData');
            // localStorage.removeItem('isLoggedIn');
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.data = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isLoggedIn = false;
            console.log(action.error.message);
        });
    },
});

export const { logoutUser } = loginSlice.actions;

export default loginSlice.reducer;
