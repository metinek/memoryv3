import './Karta.css';

function Karta({obr, klik}){
    return (
        <button className='przycisk' onClick={klik}>
            <img src={obr} alt="obrazek" />
        </button>
    );
}

export default Karta;