import "./App.css";
import React, { useState } from "react";
import axios from 'axios';


function App() {

  const cppStarterCode = `#include <iostream>
  using namespace std;
  int main() {
      cout<<"Hello World !";
  }`;

  const javaStarterCode = `public class Main {
    public static void main(String args[]) {
        System.out.println("Hello World !");
    }
  }`;

  const pythonStarterCode = `print('Hello World !')`;

  const [code, setCode] = useState(cppStarterCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('cpp');

  const changeCode = (language) => {
    if (language === "cpp") {
      setCode(cppStarterCode)
    } else if (language === "java") {
      setCode(javaStarterCode)
    } else if (language === "py") {
      setCode(pythonStarterCode)
    }
    setOutput('')
    setError('')
  }

  const handleSubmit = async () => {
    const apiReqData = {
      api_key: "6ljPpgvkPKWtZcNw1buX",
      language: language,
      code
    }

    try {
      const { data } = await axios.post("http://localhost:3002/run", apiReqData)
      setOutput(data.output)
      setError('')
    }
    catch (err) {
      const err_output_str = err.response.data.err.stderr;
      setOutput('')
      setError(err_output_str.slice(err_output_str.indexOf("\\")));
    }
  };

  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="navbar-brand">
            Syntactix
          </div>
        </nav>
      </div>

      <div className="">
        <div className="form-group languageContainer">
          <label className="m-3">Language</label>
          <select
            value={language}
            onChange={(e) => { setLanguage(e.target.value); changeCode(e.target.value); }}
            className="form-control m-3"
            name="language"
            id="exampleFormControlSelect1"
          >
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>

          <button className="btn btn-dark m-3" onClick={handleSubmit}>
            Run
          </button>
        </div>

        <div className="form-group m-3">
          <label>Code</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="18"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <div className="font-weight-bold mx-5 my-3">
        Output: <span className="text-success">{output}</span>
      </div>
      <div className="font-weight-bold mx-5 my-3">
        Error: <span className="text-danger"> {error}</span>
      </div>
    </div>
  );
}

export default App;
