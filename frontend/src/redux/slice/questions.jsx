import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    isLoading: false,
    isError: null
};

// Action creators
export const fetchQuestions = createAsyncThunk("fetchQuestions", async () => {
    const response = await fetch("http://localhost:5096/api/questions/GetQuestions", {
        method: "GET"
    });
    const jsonData = await response.json();
    return jsonData;
});

export const postQuestion = createAsyncThunk("postQuestion", async (question) => {
    const response = await fetch("http://localhost:5096/api/questions/PostQuestion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
    });
    const jsonData = await response.json();
    return jsonData;
});

const questionSlice = createSlice({
    name: "questions",
    initialState,
    
    extraReducers: (builder) => {
        // Questions
        builder.addCase(fetchQuestions.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(fetchQuestions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.error.message);
        });

        // Post Question
        builder.addCase(postQuestion.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(postQuestion.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(postQuestion.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.error.message);
        });
    },
});

export default questionSlice.reducer;
