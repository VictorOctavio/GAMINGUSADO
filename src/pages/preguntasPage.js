import React from 'react'

//Component
import Navbar from '../components/Navbar/navbar'

//React Bootstrap
import { Accordion, Card } from 'react-bootstrap'

//Data Pregumtas
import Data from '../services/preguntas'

const PreguntasPage = () => {

    const [active, setActive] = React.useState('app')

    const handleSectionPregunta = (name) => {
        setActive(name)
    }

    return (
        <React.Fragment>
            <React.StrictMode>
                <Navbar />
                <section style={{ background: '#E9E9E9', minHeight: '100vh' }}>
                    <div className="container" style={{ paddingTop: '200px' }}>

                        <div className="row">
                            <div className="col-12">
                                <h2 style={{ fontWeight: 700, textAlign: 'center', paddingBottom: '5px', borderBottom: '1px solid #ccc' }}>Preguntas frecuentes</h2>
                            </div>
                            {
                                Data.Categorias.map((item, i) => (
                                    <div className="col-6 mt-3" key={i} style={{ cursor: 'pointer' }} onClick={() => handleSectionPregunta(item.name)}>
                                        <Card style={item.name === active ? { borderColor: '#5bc0de' } : { borderColor: '#ccc' }}>
                                            <Card.Img style={{ width: '100px', margin: '0 auto' }} variant="top" src={item.imageURL} />
                                            <Card.Body>
                                                <Card.Title className="text-center">{item.title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="row mt-2">
                            {
                                Data.preguntas.map((item, i) => (
                                    item.type === active && (
                                        <div className="col-12" key={i}>
                                            <Accordion>
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle eventKey="0" className="btn text-info" style={{ fontWeight: 400 }}>
                                                            {item.title}
                                                        </Accordion.Toggle>
                                                    </Card.Header>

                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body style={{ textAlign: 'justify' }}>{item.res}</Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    </div>
                </section>
            </React.StrictMode>
        </React.Fragment>
    )
}

export default PreguntasPage
