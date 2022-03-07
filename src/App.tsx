import Header from './components/header';
import Input from './components/Input';


const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
];



function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center overflow-auto">
      <div className="m-4 p-8 mx-auto bg-white shadow-lg rounded-xl">
        <Header title={`Welcome to Lesson ${3 + 2} of #react-typescript with #tailwindcss`} />
        <div>
          {formFields.map((field) => (
            <Input key={field.id} label={field.label} type={field.type} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
