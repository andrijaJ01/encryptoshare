import React, { useState } from 'react';
import { Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Encryption = () => {
  const [encryptionKey, setEncryptionKey] = useState('');
  const [inputType, setInputType] = useState('text');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleEncryptFile = (e) => {
    if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
      alert("Please select a file.");
      return;
    }

    if (!encryptionKey) {
      alert("Please provide an encryption key.");
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const encrypted = CryptoJS.AES.encrypt(reader.result, encryptionKey).toString();
      const encodedData = encodeURIComponent(encrypted);
      navigate(`/decrypt/${encodedData}`);
    };
    reader.readAsDataURL(file);
  };

  const handleEncryptText = () => {
    if (!encryptionKey) {
      alert("Please provide an encryption key.");
      return;
    }

    if (inputValue) {
      const encrypted = CryptoJS.AES.encrypt(inputValue, encryptionKey).toString();
      const encodedData = encodeURIComponent(encrypted);
      navigate(`/decrypt/${encodedData}`);
    }
  };

  const handleEncrypt = () => {
    if (inputType === 'text') {
      handleEncryptText();
    } else if (inputType === 'file') {
      handleEncryptFile();
    }
  };

  const handleDropdownSelect = (selected) => {
    setInputType(selected);
    setInputValue(''); // Clear input value when switching between options
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={10} md={6}>
        <h1 className="text-center mb-4">Encryption</h1>
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {inputType === 'text' ? 'Encrypt Text' : 'Encrypt File'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleDropdownSelect('text')}>Text</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDropdownSelect('file')}>File</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {inputType === 'text' ?
          <Form.Group controlId="formEncryptionText">
            <Form.Label>Text to Encrypt:</Form.Label>
            <Form.Control as="textarea" rows={3} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          </Form.Group>
          :
          <Form.Group controlId="formEncryptionFile">
            <Form.Label>Select File:</Form.Label>
            <Form.Control type="file" onChange={handleEncryptFile} />
          </Form.Group>
        }
        <Form.Group controlId="formEncryptionKey">
          <Form.Label>Encryption Key:</Form.Label>
          <Form.Control type="text" value={encryptionKey} onChange={(e) => setEncryptionKey(e.target.value)} />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" className='my-2' onClick={handleEncrypt}>Encrypt</Button>
        </div>
      </Col>
    </Row>
  );
};

export default Encryption;
