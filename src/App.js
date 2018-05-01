import React, { Component } from 'react';
import * as Rx from 'rxjs';
import sampleIcon from './assets/cat_kuroashineko.png'
import './App.css'

class App extends Component {
  componentDidMount() {
    this._handleSwipe()
  }
  
  _handleSwipe() {
    const tolerance = 200;
    const windowWidth = window.innerWidth
    const imageElem = document.querySelector('.characterImage') // dom

    // 現在のスワイプ位置を取得
    const touchstart$ = Rx.Observable.fromEvent(imageElem, 'touchstart')
      .switchMap(startEvent => 
        Rx.Observable.fromEvent(imageElem, "touchend")
        .map(e => e.changedTouches[0].pageX)
      )
  
    touchstart$
      .do(val => {
        // スワイプ位置を判断して画像を振り分ける
        if(val > windowWidth - tolerance) {
          imageElem.classList.add('rotate-right')
        }
        else if(val < windowWidth / 2.0 - tolerance) {
          imageElem.classList.add('rotate-left')
        }
      })
      .delay(1000)
      .subscribe(val => {
        imageElem.classList.remove('rotate-right')
        imageElem.classList.remove('rotate-left')
      })
  }

  
  render() {
    return (
      <main>
        <figure className="characterImage">
          <img src={sampleIcon} alt="characterImage"/>
        </figure>
        <ul className="iconList">
          <li className="iconList--dislike"><i className="material-icons">clear</i></li>
          <li className="iconList--like"><i className="material-icons">favorite</i></li>
        </ul>
      </main>
    );
  }
}

export default App;