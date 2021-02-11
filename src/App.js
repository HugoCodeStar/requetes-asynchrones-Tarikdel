import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import {ListGroupItem, Container, ListGroup, Col, Row} from "react-bootstrap";



function App() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('welcome');

  const fetch = async () => {
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos`)
      console.log(res);
      setData(res.data);
    } catch (error) {
        setError('Bad username')
        console.log('error');
    }
  }

  let content ;

  if (data.length !==0){
      content = data.map((val, id) =>
          (
              <Container  key={val.id}>
                  <Row  className="justify-content-md-center">
                      <Col md={5}>
                          <ListGroup>
                              <ListGroupItem>
                                  {val.name} <Button href={val.html_url}>Repos</Button>
                              </ListGroupItem>
                          </ListGroup>
                      </Col>
                  </Row>
              </Container>
          )
      )
  } else {
      content =  (
        <main className="App-main">
          <Jumbotron>
              {error}
          </Jumbotron>
        </main>
      )
  }

  return (
    <div className="App">
      <header className="App-header">
          <label style={{color:'navajowhite'}}>User Name</label>
          <input type='text' placeholder='thisisabadusernameforreal' value={username}
                 onChange={(event) => setUsername(event.target.value)}/>

          <Button variant="primary" onClick={fetch} className="mt-3 mb-3"> Submit</Button>

          <>
          { content }
          </>

      </header>

    </div>
  );
}

export default App;
