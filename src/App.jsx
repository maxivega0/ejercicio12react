import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import Formulario from "./components/Formulario";

function App() {

  return (
    <>
    <Container>
      <h1 className='my-5 text-center'>Portal de Noticias</h1>
      <Formulario/>
    </Container>
    </>
  )
}

export default App
