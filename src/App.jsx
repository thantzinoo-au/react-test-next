import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ItemsList from "./components/ItemsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/item" />}></Route>
      <Route path="/item" element={<ItemsList />}></Route>
    </Routes>
  );
}
export default App;
