import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const Decryption = () => {
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const { encodedData } = useParams();

  useEffect(() => {
    const decryptData = () => {
      if (encodedData && decryptionKey) {
        try {
          const decodedData = decodeURIComponent(encodedData);
          const decrypted = CryptoJS.AES.decrypt(decodedData, decryptionKey).toString(CryptoJS.enc.Utf8);
          setDecryptedData(decrypted);
        } catch (error) {
          console.error('Decryption error:', error.message);
        }
      }
    };

    decryptData();
  }, [encodedData, decryptionKey]);

  const renderFile = () => {
    if (decryptedData) {
      if (decryptedData.startsWith('data:image')) {
        return <img src={decryptedData} alt="Encrypted Image" />;
      } else if (decryptedData.startsWith('data:video')) {
        return <video controls><source src={decryptedData} type="video/mp4" /></video>;
      } else if (decryptedData.startsWith('data:audio')) {
        return <audio controls><source src={decryptedData} type="audio/mp3" /></audio>;
      } else {
        // Display decrypted text if it doesn't match any specific file type
        return <p>{decryptedData}</p>;
      }
    }
    return null;
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={10} md={6}>
        <h1 className="text-center mb-4">Decryption</h1>
        <Form.Group controlId="formDecryptionKey">
          <Form.Label>Decryption Key:</Form.Label>
          <Form.Control type="text" value={decryptionKey} onChange={(e) => setDecryptionKey(e.target.value)} />
        </Form.Group>
        <div className="text-center mt-4">
          {renderFile()}
        </div>
      </Col>
    </Row>
  );
};

export default Decryption;
