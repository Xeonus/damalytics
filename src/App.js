import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import firebase from './config/firebase';


export default function App() {
  firebase.analytics();
  return <Dashboard />;
}
