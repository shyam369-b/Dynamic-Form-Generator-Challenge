# Dynamic Form Generator
A dynamic form generator that takes a JSON schema and generates a styled, functional
form in real-time. The application should display the JSON editor and the generated form side
by side.

#  Requirements

Main Interface

1. A split-screen interface with:
   
- Left side: JSON editor
- Syntax highlighting for JSON
- Real-time JSON validation
- Error messages for invalid JSON
- Right side: Generated form preview
- Updates in real-time as JSON is edited
- Responsive form layout
- Proper error states and validation
  
2. Technical Requirements:
   
- Use TypeScript for type safety
- Create proper interfaces for the JSON schema
- Handle JSON validation gracefully
- Real-time form generation and validation
- Proper error boundaries for both editor and form
- Mobile-responsive layout (stack editor and preview on smaller screens)

# Form Features

1. The generated form will:
   
- Support all field types from the schema
- Show proper validation messages
- Have loading states where appropriate
- Submit data to console.log()
- Show success message after submission
- Be styled consistently using Tailwind CSS.

# Technical Stack:

- React 18+
- TypeScript
- Tailwind CSS
- React Hook Form
- Playwright for E2E testing
- Jest for unit testing
