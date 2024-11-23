import React from "react";
import { useForm, Controller } from "react-hook-form";

interface FormGeneratorProps {
  schema: any;
}

interface FormData {
  [key: string]: any;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  // Use react-hook-form to handle form state
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log(data);
    alert('Form Submitted Sucessfully');
    
    
  };

  // Function to render form fields dynamically based on schema
  const renderField = (field: any) => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            {...field} // Spread field props for Controller integration
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
        );
      case "select":
        return (
          <select
            {...field} // Spread field props for Controller integration
            id={field.id}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          >
            {field.options.map((option: any, index: number) => (
              <option key={index} value={option.value} disabled={!option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options.map((option: any) => (
              <label key={option.value} className="inline-flex items-center space-x-2 mr-3 text-gray-800 dark:text-gray-200">
                <input
                  {...field} // Spread field props for Controller integration
                  type="radio"
                  name={field.id}
                  value={option.value}
                  className="text-blue-500 dark:text-blue-300"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case "textarea":
        return (
          <textarea
            {...field} // Spread field props for Controller integration
            id={field.id}
            placeholder={field.placeholder}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
        );
      default:
        return (
          <input
            {...field} // Spread field props for Controller integration
            id={field.id}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          />
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{schema.formTitle}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Array.isArray(schema.fields) && schema.fields.length > 0 ? (
          schema.fields.map((field: any) => (
            <div key={field.id} className="mb-4">
              <label htmlFor={field.id} className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <Controller
                name={field.id}
                control={control}
                defaultValue={field.defaultValue || ""} // Set default value dynamically
                rules={{
                  required: field.required && `${field.label} is required`,
                  minLength: field.minLength && {
                    value: Number(field.minLength), // Convert to number for validation
                    message: `${field.label} should be at least ${field.minLength} characters long`,
                  },
                  maxLength: field.maxLength && {
                    value: Number(field.maxLength), // Convert to number for validation
                    message: `${field.label} should not exceed ${field.maxLength} characters`,
                  },
                  pattern: field.validation?.pattern && {
                    value: new RegExp(field.validation.pattern),
                    message: field.validation.message,
                  },
                }}
                render={({ field: controllerField }) => (
                  <>
                    {renderField({ ...controllerField, ...field })}
                  </>
                )}
              />
              {/* Error Message */}
              {errors[field.id] && (
                <p className="text-red-500 text-sm mt-1">
                  {(errors[field.id] as any)?.message}
                </p>
              )}
            </div>
          ))
        ) : (
          <p>No fields defined in the schema.</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
