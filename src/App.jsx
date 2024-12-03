// src/App.jsx
import React from 'react';
import EntryForm from './components/EntryForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/EntryForm.css';

const App = () => {
  return (
    <div className="App">
      <EntryForm />
    </div>
  );
};

export default App;
