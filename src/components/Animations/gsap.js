import {TweenLite, Power0} from 'gsap'

const animation = {
    loadProducts: (aniImage) => {
        TweenLite.from(aniImage, .3, {y: 200, ease: Power0.easeOut})
    }
}

export default animation