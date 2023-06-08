import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ListaNoticias from "./ListaNoticias";

const Formulario = () => {
  const [noticias, setNoticias] = useState("");
  const [categoria, setCategoria] = useState("business");
  const [pais, setPais] = useState("ar");
  const [mostrarNoticias, setMostrarNoticias] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoria);
  const [paisSeleccionado, setPaisSeleccionado] = useState(pais);

  useEffect(() => {
    consultarAPI();
  }, [categoriaSeleccionada, paisSeleccionado]);

  const consultarAPI = async () => {
    try {
      const respuesta = await fetch(
        `https://newsdata.io/api/1/news?apikey=pub_24226bbf6e7720ff5842fd3588486e1d1dc24&category=${categoria}&country=${pais}`
      );
      const dato = await respuesta.json();
      await setNoticias(dato);
      setMostrarNoticias(true);
      console.log(dato);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoria(e.target.value);
  };
  const handlePais = (e) => {
    setPais(e.target.value);
  };

  return (
    <>
      <Form className="row">
        <Form.Group className="mb-3 d-flex flex-column" controlId="noticia">
          <Container>
            <Form.Label>Seleccione su pais</Form.Label>
            <Form.Select onChange={(e) => handlePais(e)}>
              <option value="">Seleccionar pais</option>
              <option value="de">Alemania</option>
              <option value="ar">Argentina</option>
              <option value="br">Brasil</option>
              <option value="cl">Chile</option>
              <option value="us">Estados Unidos</option>
              <option value="es">España</option>
              <option value="mx">Mexico</option>
              <option value="jp">Japon</option>
            </Form.Select>
          </Container>
          <Container className="my-3">
            <Form.Label>Seleccione la categoria de noticia</Form.Label>
            <Form.Select onChange={(e) => handleSubmit(e)}>
              <option>Elige que tipo de noticia te interesa</option>
              <option value="business">Negocios</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="world">Globales</option>
              <option value="health">Salud</option>
              <option value="science">Ciencia</option>
              <option value="sports">Deportes</option>
              <option value="technology">Tecnologia</option>
            </Form.Select>
          </Container>
          <Container className="my-3 text-center">
            <Button
              variant="warning"
              onClick={() => {
                setCategoriaSeleccionada(categoria);
                setPaisSeleccionado(pais);
              }}
            >
              Buscar
            </Button>
          </Container>
        </Form.Group>
      </Form>
      <Container className="row">
        {mostrarNoticias && <ListaNoticias noticias={noticias.results} />}
      </Container>
    </>
  );
};

export default Formulario;
