import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";



function App() {
  const [data, setData] = useState('Nothing yet');

  const fetch = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      console.log(res);
      setData(res.data.title);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <Button variant="primary" onClick={fetch} className="mt-3 mb-3">
            Submit
          </Button>
      </header>
      <main className="App-main">
        <Jumbotron>
          {data}
        </Jumbotron>
      </main>
    </div>
  );
}

export default App;
