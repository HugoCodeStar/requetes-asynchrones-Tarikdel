import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";



function App() {
  const [repoList, setRepoList] = useState([]);
  const [user, setUser] = useState('');

  const getRepos = async (user) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${user}/repos`)
      setRepoList(
        <ListGroup>
          {res.data.map((data) =>
            <ListGroup.Item key={data.full_name} className="d-flex justify-content-between">
              {data.name}
              <Button href={data.html_url}>Repo</Button>
            </ListGroup.Item>
          )}
        </ListGroup>)
      console.log(res);
    } catch (error) {
      setRepoList(<Alert variant='danger'>Bad username</Alert>);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      console.log(error.response.message);
    }
  }

  const handleSubmit = (e) =>{
    console.log(user)
    getRepos(user)
    e.preventDefault();
  }

  const handleChange = (e) =>{
    setUser(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form onSubmit={handleSubmit}>
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" value={user} onChange={handleChange} placeholder="Enter github username" />
          <Button variant="primary" type="submit" className="mt-3 mb-3">
            Submit
          </Button>
        </Form>
      </header>
      <main className="App-main">
        {repoList}
      </main>


    </div>
  );
}

export default App;
