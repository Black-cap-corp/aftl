import React, { useEffect } from "react";
import Project from "./Project";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncProject } from "../../../redux/projectSlice";

const ProjectContainer = () => {
  const dispatch = useDispatch();
  const projectsFn = (state) => state.projects.allProjects; // getting current display items
  const projects = useSelector(projectsFn);
  useEffect(() => {
    dispatch(getAsyncProject()); // getting projects or divisions
  }, []);
  return <Project data={projects} type="projects" />;
};

export default ProjectContainer;
