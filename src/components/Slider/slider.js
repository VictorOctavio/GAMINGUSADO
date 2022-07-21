import React from 'react'

//ReactBootstrap
import {Carousel} from 'react-bootstrap';
import Wallpapers from '../../services/image';

import {withRouter} from 'react-router-dom'

const Slider = ({history}) => {
    return (
        <section style={{marginTop: '0'}}>
            <Carousel>
            {
                Wallpapers !== null ? (
                    Wallpapers.map(item => (
                        <Carousel.Item key={item.name}>
                            <img src={item.photoURL} alt={item.name}  style={{height: '75vh', objectFit: 'cover', width: '100%'}}/>
                        </Carousel.Item>
                    ))
                ): null
            }
            </Carousel>
        </section>
    )
}

export default withRouter(Slider)
