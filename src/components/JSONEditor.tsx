import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai"; // Dark theme
import "ace-builds/src-noconflict/theme-github"; // Light theme

interface JSONEditorProps {
  schema: any;
  setSchema: React.Dispatch<React.SetStateAction<any>>;
  isDarkMode: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, setSchema, isDarkMode }) => {
  const [editorContent, setEditorContent] = useState(JSON.stringify(schema, null, 2)); // Local state for the editor
  const [error, setError] = useState<string | null>(null); // State to track JSON validation errors

  const handleChange = (newValue: string) => {
    setEditorContent(newValue); // Update the local editor content

    try {
      const parsed = JSON.parse(newValue); // Validate JSON syntax
      const ids = parsed.fields.map((field: any) => field.id);

      // Check for duplicate IDs
      const duplicateIds = ids.filter((id: string, index: number) => ids.indexOf(id) !== index);
      if (duplicateIds.length > 0) {
        const uniqueDuplicateIds = Array.from(new Set(duplicateIds));
        setError(`Duplicate ID(s) found: ${uniqueDuplicateIds.join(", ")}`);
        return;
      }

      setSchema(parsed); // Update the parent schema if valid
      setError(null); // Clear error if JSON is valid
    } catch (err) {
      setError("Invalid JSON format."); // Set error message if JSON parsing fails
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <AceEditor
        mode="json"
        theme={isDarkMode ? "monokai" : "github"} // Change theme based on dark mode
        value={editorContent} // Display the current editor content
        onChange={handleChange} // Handle changes in the editor
        name="json_editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          wrapBehavioursEnabled: true,
          useWorker: false,
          wrap: true,
        }}
        width="100%"
        
        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
      />
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error} {/* Display validation errors */}
        </div>
      )}
    </div>
  );
};

export default JSONEditor;
