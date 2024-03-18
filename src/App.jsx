import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Decryption from './components/decrypt';
import Encryption from './components/encrypt';
import { Container } from 'react-bootstrap';

const App = () => {

  return (
    <Router>
      <Container fluid className='h-100'>
        <Routes>
          <Route path="/" element={<Encryption  />} />
          <Route path="/decrypt/:encodedData" element={<Decryption  />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
