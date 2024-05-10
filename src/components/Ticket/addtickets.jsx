import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { TextField, MenuItem } from '@mui/material';
import {Main, DrawerHeader} from '../Content';
const priorities = ['Low', 'Normal', 'High'];

const AddTicket = () => {
  const [topic, setTopic] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ topic, priority, message });
  };

  return (
    
    <Main open={open}>
    <DrawerHeader />
    <div className="d-flex justify-content-center align-items-center vh-50 "> {/* Centering container */}
      <div className="bg-light p-4 rounded shadow w-50"> {/* Container with shadow and rounded corners */}
      <div className="d-flex justify-content-center mt-3">
            <h4 className='fs-4'>Create New Ticket</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="topic">
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              {priorities.map((p) => (
                <option key={p} value={p.toLowerCase()}>
                  {p}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your message"
              style={{ height: '100px'}}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className='w-100' type="submit">
            Submit
          </Button>
          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary">BACK</Button>
            </div>
        </Form>
      </div>
    </div>
    
    </Main>
  );
};

export default AddTicket;