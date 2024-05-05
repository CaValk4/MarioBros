import React, { useEffect, useState } from 'react';
import './pages/Home.css';
import pipe from './theme/assets/pipe.png';
import marioGif from './theme/assets/mario.gif';
import marioGameOver from './theme/assets/game-over.png';
import cr7C from './theme/assets/cr7C.jpg';
import clouds from './theme/assets/clouds.png';
import sii from './theme/songs/sii.mp3';


const Home: React.FC = () => {

  const [gameOver, setGameOver] = useState<boolean>(false);
  useEffect(() => {
    const clouds = document.querySelector('.clouds') as HTMLElement;
    const marioElement = document.querySelector('.mario') as HTMLElement;
    const sii = document.getElementById('sii') as HTMLElement;
    const pipeElement = document.querySelector('.pipe') as HTMLElement;
    const careca = document.querySelector('.careca') as HTMLElement;

    const jump = () => {
      marioElement.classList.add('jump');

      setTimeout(() => {
        marioElement.classList.remove('jump');
      }, 1000);
    }

    const loop = setInterval(() => {
      const pipePosition = pipeElement.offsetLeft;
      const marioPosition = +window.getComputedStyle(marioElement).bottom.replace('px', '');
      

      if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        clearInterval(loop);
        setGameOver(true);
        pipeElement.style.animation = 'none';
        pipeElement.style.left = '75px';
        marioElement.style.animation = 'none';
        marioElement.setAttribute('src', marioGameOver);
        marioElement.style.width = '75px';
        marioElement.style.marginLeft = '50px';

        
        clouds.style.animation = 'none';



        return;
      }

    }, 10);

    document.addEventListener('keydown', jump);

    return () => {
      clearInterval(loop);
      document.removeEventListener('keydown', jump);
    };
  }, []);

  return (
    <div className="game-board">
      <img src={clouds} className="clouds" alt="clouds" />
      <img src={cr7C} className="careca" alt="careca" />
      <img src={marioGif} className="mario" alt="mario" />
      <img src={pipe} className="pipe" alt="pipe" />
      <audio src={sii} className='sii'></audio>
      {gameOver && <div className="game-over-text">GAME OVER</div>}
    </div>
  );
}

export default Home;
