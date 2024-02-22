import './App.css';
import {useState} from 'react';
import tyl from './img/tyl.png';
import k1 from './img/k1.png';
import k2 from './img/k2.png';
import k3 from './img/k3.png';
import Karta from './Karta.jsx';

const Karty=[tyl, k1, k2, k3];
let wylosowane=[1,1,1,1,1,1];
let odkryte=[0,0,0,0,0,0];
let liczby=[1,1,2,2,3,3];
let pom;
let kp=-1;
let kd=-1;
let kpi, kdi;  //indeksy kart


function nowaGra(a=6) {
  liczby=[1,1,2,2,3,3];
  for(let i=0; i<a; i++) {
    pom = (Math.abs(Math.floor(Math.random() * a-i-1) + 0));
    wylosowane[i] = liczby[pom];
    liczby.splice(pom, 1);
    console.log(liczby);
  }
}









const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}












function App() {
  nowaGra();
  let [karty, setKarty] = useState(Array(6).fill(tyl));
  let [licznik, setLicznik] = useState(0);



  
 async function obslugaKlik(i)
  {
    if(odkryte[i]!=0) return;
    let k = karty.slice();
    
    if(kp==-1) { //to jest karta pierwsza
      k[i] = Karty[wylosowane[i]];
      setKarty(k);
      kp = wylosowane[i];
      odkryte[i] = wylosowane[i];
      kpi=i;
      await delay(500);
      return;
    }
    if(kd==-1) {
      k[i] = Karty[wylosowane[i]];
      setKarty(k);
      kd = wylosowane[i];
      odkryte[i] = wylosowane[i];
      kdi=i;      
      await delay(500);
      setLicznik(licznik+1);
    }

    if(kp == kd) { //karty równe
      kp=kd=-1;
      await delay(500);
    }



    else { //karty różne
      await delay(1000);
      k[kpi] = tyl;
      k[kdi] = tyl;
      odkryte[kpi] = 0;
      odkryte[kdi] = 0;
      setKarty(k.slice());
      kp = kd = -1;
    }



    
    
    console.log(i, kp, kd, kpi, kdi);
  }

  return (
    <div className="App">
      <h1>Memory</h1>
      <div className='wiersz'>
        <Karta obr={karty[0]} klik={()=>obslugaKlik(0)} />
        <Karta obr={karty[1]} klik={()=>obslugaKlik(1)} />
        <Karta obr={karty[2]} klik={()=>obslugaKlik(2)} />
      </div>
      <div className='wiersz'>
        <Karta obr={karty[3]} klik={()=>obslugaKlik(3)} />
        <Karta obr={karty[4]} klik={()=>obslugaKlik(4)} />
        <Karta obr={karty[5]} klik={()=>obslugaKlik(5)} />
      </div>
      <h2>Liczba prób: {licznik}</h2>
      <button onClick={nowaGra}>Nowa gra</button>
    </div>




  );
}

export default App;
