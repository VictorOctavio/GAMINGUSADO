import {BsDisplay} from 'react-icons/bs'
import {ImFloppyDisk} from 'react-icons/im'
import {IoHardwareChip} from 'react-icons/io5'
import {FaHeadphones, FaMemory, FaMicrophoneAlt, FaMouse, FaDigitalTachograph, FaKeyboard} from 'react-icons/fa'
import {SiUikit} from 'react-icons/si'
import {MdComputer} from 'react-icons/md'

const categorias = [
    {name:'pc', icon: <MdComputer/>},
    {name: 'procesador', icon: <IoHardwareChip/>},
    {name: 'grafica', icon: <FaDigitalTachograph/>},
    {name: 'ram', icon: <FaMemory/>},
    {name: 'almacenamiento', icon: <ImFloppyDisk/>},
    {name: 'monitor', icon: <BsDisplay/>},
    {name: 'mouse', icon: <FaMouse/>},
    {name: 'auricular', icon: <FaHeadphones/>},
    {name: 'teclado', icon: <FaKeyboard/>},
    {name: 'kit', icon: <SiUikit/>},
    {name: 'microfono', icon: <FaMicrophoneAlt/>}
]




export default categorias