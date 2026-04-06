import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import file CSS untuk Tailwind
import "./tailwind.css"; 

// Import komponen utama yang sudah kita buat
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import FrameworkList from "./FrameworkList";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <FrameworkList /> */}
    <FrameworkListSearchFilter />
  </StrictMode>
);