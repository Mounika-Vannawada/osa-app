import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState(''); // Stores the Query searched
  const [response, setResponse] = useState({}); // Stores the Response for the query

  // Styling for the instrument response area
  const cardStyle = {
    width: '100%',
    backgroundColor: '#b2beb5',
    fontSize: '1.2em',
    minHeight: '300px',
    textAlign: 'left'
  };

  // Server request for the query response
  const getCommandOutput = () => {
    const qry = query.replace(/\/cmd\//i, '')

    axios.get('api/cmd/' + qry)
      .then(res => {
        const output = {
          'status': res.data.status,
          'text': res.data.text
        };

        setResponse(output);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      {/* Input field and Button for query */}
      <InputGroup className="mb-3">
        <FormControl type="text" placeholder="Search" className="mr-sm-2"
          onChange={event => setQuery(event.target.value)} />
        <Button onClick={getCommandOutput} variant="success">Search</Button>
      </InputGroup>

      {/* Displays the instrument response */}
      <Card style={cardStyle}>
        <Card.Body>
          <Card.Title style={{ color: '#04141a' }}>Command Response</Card.Title>
          <br></br>
          <Card.Text>
            {response.status ? 'Status:' + response.status : 'waiting for command'}
          </Card.Text>
          <Card.Text>
            {response.text ? 'Response:' + response.text : ''}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Search;
