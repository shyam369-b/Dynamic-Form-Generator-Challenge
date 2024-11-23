import React, { useState, useEffect } from "react";
import FormGenerator from "./components/FormGenerator";
import JSONEditor from "./components/JSONEditor";
import "./styles.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle the `dark` class on the root HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const [schema, setSchema] = useState<any>({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Full Name",
        required: true,
        minLength: "3",
        maxLength: "20",
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      },
      {
        id: "companySize",
        type: "select",
        label: "Company Size",
        required: true,
        options: [
          { value: "", label: "Select" },
          { value: "1-50", label: "1-50 employees" },
          { value: "51-200", label: "51-200 employees" },
          { value: "201-1000", label: "201-1000 employees" },
          { value: "1000+", label: "1000+ employees" },
        ],
      },
      {
        id: "industry",
        type: "radio",
        label: "Industry",
        required: true,
        options: [
          { value: "tech", label: "Technology" },
          { value: "healthcare", label: "Healthcare" },
          { value: "finance", label: "Finance" },
          { value: "retail", label: "Retail" },
          { value: "other", label: "Other" },
        ],
      },
      {
        id: "timeline",
        type: "select",
        label: "Project Timeline",
        required: true,
        options: [
          { value: "", label: "Select" },
          { value: "immediate", label: "Immediate (within 1 month)" },
          { value: "short", label: "Short-term (1-3 months)" },
          { value: "medium", label: "Medium-term (3-6 months)" },
          { value: "long", label: "Long-term (6+ months)" },
        ],
      },
      {
        id: "comments",
        type: "textarea",
        label: "Additional Comments",
        required: false,
        placeholder: "Any other details you'd like to share...",
      },
    ],
  });

  // Function to copy the form JSON to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(schema, null, 2))
      .then(() => {
        alert("Form JSON copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying JSON: ", error);
        alert("Failed to copy JSON.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-gray-100 transition-colors duration-300">
      {/* Dark Mode Toggle */}
      <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 rounded-md">
        <h1 className="text-xl font-bold">Dynamic Form and JSON Editor</h1>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 rounded bg-blue-500 dark:bg-white text-black dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        {/* JSON Editor */}
        <div className="editor p-4 bg-white dark:bg-black rounded shadow-md overflow-auto flex flex-col w-full md:h-[calc(100vh-80px)]">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">JSON Editor</h2>
          <JSONEditor schema={schema} setSchema={setSchema} isDarkMode={isDarkMode} />
        </div>

        {/* Form Generator */}
        <div className="form p-4 bg-white dark:bg-black rounded shadow-md overflow-auto flex flex-col w-full h-auto md:h-[calc(100vh-80px)]">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Generated Form</h2>
          <FormGenerator schema={schema} />
        </div>
      </div>

      {/* Copy Form JSON Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded bg-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-700 dark:text-gray-100"
        >
          Copy Form JSON
        </button>
      </div>
    </div>
  );
};

export default App;
