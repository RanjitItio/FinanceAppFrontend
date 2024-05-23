<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Main, DrawerHeader} from '../Content';
const status = ['open', 'closed', 'in progress'];
const TicketReply = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [priority, setPriority] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length,
        text: inputMessage,
        sender: 'You', // Assuming the user is the sender
        timestamp: new Date().toLocaleTimeString(),
        attachment: attachment ? URL.createObjectURL(attachment) : null,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setAttachment(null);
    }
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  return (
    <Main open={open}>
    <DrawerHeader />
    <Container fluid className="h-100 rounded-md justify-center border-light shadow-sm p-5">
    <div className="d-flex justify-content-center">
          <p className='fs-3'>TICKET</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className='text-muted'>Ask support for any kinds of problem you face</p>
        </div>
        <div className='d-flex justify-content-between' >
          <a href="/tickets/" className='text-muted'>BACK</a>
          {/* <p className='text-muted' >BACK</p> */}

        </div>
        <Row className='m-5'>
            <Col>
            <Card style={{ width: '25rem' }} className='shadow-lg mx-5 justify-content-center'>
                <Card.Header>Ticket Replies</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>Ticket ID</Col>
                        <Col> #hdghsv</Col>
                    </Row>
                    
                    <Card className='p-1 mt-2'>
                        <h1 className='fs-6'>Subject</h1>
                        <p>rute</p>
                    </Card>
                    

                    <Card  className='p-1 mt-2'>
                        <h1 className='fs-6'>Priority</h1>
                        <p>Normal</p>
                    </Card>
                 

                    <Card  className='p-1 mt-2'>
                        <h1 className='fs-6'>Time</h1>
                        <p>08-05-2024 3:42 PM</p>
                    </Card>
        

                    <Row  className='p-1 mt-2'>
                        <Col>
                        <Form.Group className="mb-3" controlId="priority">
                          
                          <Form.Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value="">Select status</option>
                            {status.map((p) => (
                              <option key={p} value={p.toLowerCase()}>
                                {p}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col><Button>submit</Button> </Col>
                    </Row>
                </Card.Body>
                
            </Card>
            </Col>
            <Col>
      <Row className="bg-primary text-white p-3 shadow-lg rounded-md">
        <Col>
          <h2>Reply </h2>
        </Col>
      </Row>
      
      <Row className="bg-light p-3 shadow-lg">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="messageInput" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="fileInput" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="h-100 overflow-auto p-3">
        <Col>
          {messages.map((message) => (
            <div key={message.id} className={`mb-3 ${message.sender === 'You' ? 'text-end' : 'text-start'}  `}>
              <div className={`border p-3 rounded ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-light shadow-lg'}`}>
                {message.text}
              </div>
              {message.attachment && (
                <img
                  src={message.attachment}
                  alt="Attachment"
                  className="img-fluid mt-2 w-50 shadow-lg"
                />
              )}
              <div className="text-muted mt-2">{message.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Col>
      </Row>
      </Col>
        </Row>
    </Container>
    </Main>
  );
};

export default TicketReply;
=======
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Main, DrawerHeader} from '../Content';



const status = ['open', 'closed', 'in progress'];



const TicketReply = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [priority, setPriority] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new message arrives
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length,
        text: inputMessage,
        sender: 'You', // Assuming the user is the sender
        timestamp: new Date().toLocaleTimeString(),
        attachment: attachment ? URL.createObjectURL(attachment) : null,
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      setAttachment(null);
    }
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  return (
    <Main open={open}>
    <DrawerHeader />
    <Container fluid className="h-100 rounded-md justify-center border-light shadow-sm p-5">
        <Row className='m-5'>
            <Col>
            <Card style={{ width: '20rem' }} className='shadow-lg m-5 justify-content-center'>
                <Card.Header>Ticket Replies</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>Ticket ID</Col>
                        <Col> #hdghsv</Col>
                    </Row>
                    
                    <Card className='p-1 mt-2'>
                        <h1 className='fs-6'>Subject</h1>
                        <p>rute</p>
                    </Card>
                    

                    <Card  className='p-1 mt-2'>
                        <h1 className='fs-6'>Priority</h1>
                        <p>Normal</p>
                    </Card>
                 

                    <Card  className='p-1 mt-2'>
                        <h1 className='fs-6'>Time</h1>
                        <p>08-05-2024 3:42 PM</p>
                    </Card>
        

                    <Row  className='p-1 mt-2'>
                        <Col>
                        <Form.Group className="mb-3" controlId="priority">
                          
                          <Form.Select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                          >
                            <option value="">Select status</option>
                            {status.map((p) => (
                              <option key={p} value={p.toLowerCase()}>
                                {p}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col><Button>submit</Button> </Col>
                    </Row>
                </Card.Body>
                
            </Card>
            </Col>
            <Col>
      <Row className="bg-primary text-white p-3 shadow-lg rounded-md">
        <Col>
          <h2>Reply </h2>
        </Col>
      </Row>
      
      <Row className="bg-light p-3 shadow-lg">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="messageInput" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="fileInput" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="h-100 overflow-auto p-3">
        <Col>
          {messages.map((message) => (
            <div key={message.id} className={`mb-3 ${message.sender === 'You' ? 'text-end' : 'text-start'}  `}>
              <div className={`border p-3 rounded ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-light shadow-lg'}`}>
                {message.text}
              </div>
              {message.attachment && (
                <img
                  src={message.attachment}
                  alt="Attachment"
                  className="img-fluid mt-2 w-50 shadow-lg"
                />
              )}
              <div className="text-muted mt-2">{message.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Col>
      </Row>
      </Col>
        </Row>
    </Container>
    </Main>
  );
};

export default TicketReply;
>>>>>>> 918fc62507cf25ce32ef439a27a76d9b65a16e84
