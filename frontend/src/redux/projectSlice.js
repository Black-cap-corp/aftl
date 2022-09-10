import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";

export const addandUpdateAsync = createAsyncThunk(
  "project/addandUpdateAsync",
  async (operation) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/projects/add`, operation, {
      headers: {
        authorization: jwt,
      },
    });

    operation.operationEl.id = res.data.id;
    return operation;
  }
);

export const setSelectionAsyncProject = createAsyncThunk(
  "project/setAsyncProject",
  async (operation) => {
    return { operation };
  }
);

export const getAsyncProject = createAsyncThunk(
  "project/getAsync",
  async () => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.get(`${BASE_URL}/projects`, {
      headers: {
        authorization: jwt,
      },
    });
    return { res: res.data };
  }
);

export const updateAsyncProject = createAsyncThunk(
  "project/updateAsync",
  async (operation) => {
    const jwt = sessionStorage.getItem("auth_token");
    await axios.post(`${BASE_URL}/projects/update`, operation, {
      headers: {
        authorization: jwt,
      },
    });

    return operation;
  }
);

export const deleteAsyncProject = createAsyncThunk(
  "project/deleteAsync",
  async (operation) => {
    const jwt = sessionStorage.getItem("auth_token");
    const res = await axios.post(`${BASE_URL}/projects/delete`, operation, {
      headers: {
        authorization: jwt,
      },
    });

    return { status: res.data.status, operation };
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    selected: { projectId: "", divisionId: "" },
    allProjects: [],
  },
  reducers: {
    setSelected: (state, action) => {
      return { ...state, selectedProject: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addandUpdateAsync.fulfilled, (state, action) => {
        const operation = action.payload;
        const findProjectIndex = state.allProjects?.findIndex(
          (project) => project.id === state.selected.projectId
        );
        const findDivisionIndex = state.allProjects[
          findProjectIndex
        ].divisions?.findIndex(
          (division) => division.id === state.selected.divisionId
        );
        switch (true) {
          case operation.operationType === "projects":
            state.allProjects.push({ ...operation.operationEl, divisions: [] });
            return state;
          case operation.operationType === "divisions":
            state.allProjects[findProjectIndex].divisions.push({
              ...operation.operationEl,
              subdivisions: [],
            });
            return state;

          case operation.operationType === "subdivisions":
            state.allProjects[findProjectIndex].divisions[
              findDivisionIndex
            ].subdivisions.push(operation.operationEl);
            return state;

          default:
            return state;
        }
      })
      .addCase(getAsyncProject.fulfilled, (state, action) => {
        return { ...state, allProjects: action.payload.res };
      })
      .addCase(setSelectionAsyncProject.fulfilled, (state, action) => {
        const { operation } = action.payload;
        switch (true) {
          case operation.operationType === "projects":
            state.selected.projectId = operation.operationEl.id;
            return state;
          case operation.operationType === "divisions":
            state.selected.divisionId = operation.operationEl.id;
            return state;
          default:
            return state;
        }
      })
      .addCase(updateAsyncProject.fulfilled, (state, action) => {
        const operation = action.payload;
        const { operationEl } = operation;
        const id = operation.operationEl.id;
        const findProjectIndex = state.allProjects?.findIndex(
          (project) => project.id === state.selected.projectId
        );
        const findDivisionIndex = state.allProjects[
          findProjectIndex
        ].divisions?.findIndex(
          (division) => division.id === state.selected.divisionId
        );
        switch (true) {
          case operation.operationType === "projects":
            state.allProjects = state.allProjects.map((project) => {
              if (project.id === operationEl.id) {
                return { ...project, name: operationEl.name };
              } else return project;
            });
            return state;
          case operation.operationType === "divisions":
            state.allProjects[findProjectIndex].divisions = state.allProjects[
              findProjectIndex
            ].divisions.map((division) => {
              if (division.id === operationEl.id) {
                return { ...division, name: operationEl.name };
              } else {
                return division;
              }
            });
            return state;

          case operation.operationType === "subdivisions":
            state.allProjects[findProjectIndex].divisions[
              findDivisionIndex
            ].subdivisions = state.allProjects[findProjectIndex].divisions[
              findDivisionIndex
            ].subdivisions.map((subdivision) => {
              if (subdivision.id === operationEl.id) {
                return { ...subdivision, name: operationEl.name };
              } else {
                return subdivision;
              }
            });
            return state;

          default:
            return state;
        }
      })
      .addCase(deleteAsyncProject.fulfilled, (state, action) => {
        const res = action.payload;
        const { operation } = res;
        const projectIndex = state.allProjects?.findIndex(
          (project) => project.id === state.selected.projectId
        );
        const divisionIndex = state.allProjects[
          projectIndex
        ].divisions?.findIndex(
          (division) => division.id === state.selected.divisionId
        );
        if (res.status === "success") {
          switch (true) {
            case operation.operationType === "projects":
              state.allProjects = state.allProjects.filter(
                (project) => project.id !== operation.operationEl.id
              );
              return state;
            case operation.operationType === "divisions":
              state.allProjects[projectIndex].divisions = state.allProjects[
                projectIndex
              ].divisions?.filter(
                (division) => division.id !== operation.operationEl.id
              );
              return state;
            case operation.operationType === "subdivisions":
              state.allProjects[projectIndex].divisions[
                divisionIndex
              ].subdivisions = state.allProjects[projectIndex].divisions[
                divisionIndex
              ].subdivisions.filter(
                (subdivision) => subdivision.id !== operation.operationEl.id
              );
              return state;
            default:
              return state;
          }
        }
      });
  },
});

export default projectSlice.reducer;
export const { setSelected } = projectSlice.actions;
