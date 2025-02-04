import React from 'react';
import styled from 'styled-components';

interface CustomCSSProperties {
  "--i"?: number;
}

declare module 'react' {
  interface CSSProperties extends CustomCSSProperties {}
}

const Input = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="bg" />
        <div className="input-wrapper">
          <div className="input">
            <div className="glow left" />
            <div className="glow right" />
            <input type="text" name="text" placeholder="Search..." />
            <div className="reflection" />
            <div className="icon">
              <svg stroke="#fff" viewBox="0 0 38 38" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="loading">
                <g fillRule="evenodd" fill="none">
                  <g strokeWidth={3} transform="translate(1 1)">
                    <circle r={18} cy={18} cx={18} strokeOpacity=".2" />
                    <path d="M36 18c0-9.94-8.06-18-18-18" />
                  </g>
                </g>
              </svg>
              <svg viewBox="0 0 490.4 490.4" version="1.1" width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="magnifier">
                <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z" />
              </svg>
            </div>
            <button className="filter">
              <span></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" strokeWidth={2} fill="none" stroke="currentColor">
                  <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <div style={{"--i": 1} as CustomCSSProperties}></div>
            </button>
            <div className="result">
              <header className="result-header">
                <div style={{"--i": 1}}>
                  <input type="radio" id="all" name="tab" defaultChecked />
                  <label htmlFor="all" data-label="All">
                    <span>All</span>
                  </label>
                </div>
                <div style={{"--i": 2}}>
                  <input type="radio" id="buttons" name="tab" />
                  <label htmlFor="buttons" data-label="Buttons">
                    <span>Buttons</span>
                  </label>
                </div>
                <div style={{"--i": 3}}>
                  <input type="radio" id="cards" name="tab" />
                  <label htmlFor="cards" data-label="Cards">
                    <span>Cards</span>
                  </label>
                </div>
                <div style={{"--i": 4}}>
                  <input type="radio" id="inputs" name="tab" />
                  <label htmlFor="inputs" data-label="Inputs">
                    <span>Inputs</span>
                  </label>
                </div>
              </header>
              <div className="result-content-header">
                <div style={{"--i": 1}}>Name <span>↓</span></div>
                <div style={{"--i": 2}}>Date</div>
                <div style={{"--i": 3}}>Rating</div>
              </div>
              <div className="result-content">
                <a style={{"--i": 1}}>
                  <div>Item I</div>
                  <div>11th July</div>
                  <div>★★★★★</div>
                </a>
                <a style={{"--i": 2}}>
                  <div>Item II</div>
                  <div>09th June</div>
                  <div>★★★★</div>
                </a>
                <a style={{"--i": 3}}>
                  <div>Item III</div>
                  <div>07th May</div>
                  <div>★★★</div>
                </a>
                <div className="lava" />
              </div>
            </div>
          </div>
          <div className="glow-outline" />
          <div className="glow-layer-bg" />
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
          <div className="glow-layer-3" />
          <div className="glow left" />
          <div className="glow right" />
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    --ease-elastic: cubic-bezier(0.7, -0.5, 0.3, 1.5);
    --icon-color: #bcacbd;
    --glow-l-color: #8422b1;
    --glow-r-color: #0d00ff;
    --input-radius: 14px;
    --result-item-h: 33.5px;

    background-color: #010001;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    animation: fadeIn 1.4s ease forwards 0.2s;
  }
  .container .bg {
    position: absolute;
    inset: 0;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 40%,
      black 60%,
      transparent 100%
    );
  }
  .container .bg::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 400px;
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 12px 12px;
    mask-image: linear-gradient(
      transparent 0%,
      black 40%,
      black 60%,
      transparent 100%
    );
  }

  .input-wrapper {
    position: relative;
    z-index: 1;
  }

  .input {
    background-color: #010201;
    border-radius: var(--input-radius);
    position: relative;
    z-index: 10;
  }
  .input::before {
    pointer-events: none;
    content: "type to interact";
    position: absolute;
    left: 0;
    right: 0;
    top: 95px;
    font-size: 18px;
    margin: auto;
    text-align: center;
    font-weight: lighter;
    opacity: 0.4;
    color: white;
    mask-image: linear-gradient(to top, rgba(255, 255, 255, 0.1) 0%, white 100%);
  }

  .reflection {
    position: absolute;
    inset: 0;
    z-index: 9;
    border-radius: var(--input-radius);
    pointer-events: none;
    overflow: hidden;
  }
  .reflection:before {
    content: "";
    position: absolute;
    width: 500px;
    background-color: rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      to right,
      rgba(244, 221, 255, 0.1) 10%,
      rgba(244, 221, 255, 0.5) 60%,
      rgba(244, 221, 255, 0.3) 60%,
      rgba(244, 221, 255, 0.1) 90%
    );
    top: 0;
    bottom: 0;
    opacity: 0.3;
    transform: translateX(-540px) skew(-40deg);
  }
  .reflection::after {
    content: "";
    position: absolute;
    left: 68px;
    right: 50%;
    top: 10px;
    bottom: 10px;
    z-index: -1;
    background: linear-gradient(to right, transparent, rgba(2, 2, 2, 0.6));
  }
  .input:focus-within .reflection:before {
    transition: all 1.2s cubic-bezier(0.5, 0, 0.3, 1);
    transform: translate(440px, 0) skew(40deg) scaleX(0.5);
  }

  .input input {
    max-width: 100%;
    width: 310px;
    height: 60px;
    padding: 0 67px;
    font-size: 20px;
    background: none;
    border: none;
    color: white;
    position: relative;
    transition: all 0.5s var(--ease-elastic);
    outline: none;
    border-radius: var(--input-radius);
    z-index: 2;
  }

  .input input::placeholder {
    color: #d6d0d6;
  }

  .icon {
    display: grid;
    place-items: center;
    position: absolute;
    left: 14px;
    top: 8px;
    bottom: 8px;
    width: 42px;
    font-size: 24px;
    color: var(--icon-color);
    z-index: 3;
    pointer-events: none;
  }
  .icon svg {
    grid-area: 1 / 1;
    transition: opacity 0.5s linear, transform 0.2s ease;
    overflow: visible;
  }
  .icon svg.loading > g {
    transform-origin: center;
    animation: spinner 1s linear infinite;
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .filter {
    z-index: 3;
    background: none;
    font-size: 27px;
    position: absolute;
    right: 7px;
    top: 7px;
    bottom: 7px;
    width: 46px;
    cursor: pointer;
    color: var(--icon-color);
    border: none;
    overflow: hidden;
    border-radius: calc(var(--input-radius) * 0.9);
  }
  .filter:before {
    content: "";
    position: absolute;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      to right,
      rgba(244, 221, 255, 0.1) 10%,
      rgba(244, 221, 255, 0.5) 60%,
      rgba(244, 221, 255, 0.3) 60%,
      rgba(244, 221, 255, 0.1) 90%
    );
    top: -40%;
    bottom: -40%;
    left: -220px;
    z-index: 1;
    opacity: 0.3;
    transform: translateX(0) skew(-30deg);
  }
  .filter:hover:before {
    transition: all 0.8s cubic-bezier(0.5, 0, 0.3, 1);
    transform: translate(320px, 0) skew(30deg);
  }
  .filter span {
    inset: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: linear-gradient(to bottom, #171725 0%, #0c0a2a 70%, #1b1856 100%);
    background-clip: padding-box;
    border: solid 2px transparent;
    box-shadow: inset 0 3px 3px -3px rgba(0, 0, 0, 0.5);
  }
  .filter,
  .filter svg {
    transition: all 0.2s ease;
  }
  .filter span::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(to bottom, #333161 0%, #0c0a2a 50%, #3d3a75 100%);
  }
  .filter:hover {
    filter: brightness(1.3);
  }
  .filter:hover svg {
    transform: scale(1.07);
  }
  .filter:focus svg {
    animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  /* Result */

  .result {
    position: absolute;
    left: 11px;
    right: 11px;
    top: 100%;
    border-radius: 0 0 var(--input-radius) var(--input-radius);
    transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
    transition-delay: 0.2s;
    background: black;
    background-clip: padding-box;
    border: solid 2px transparent;
    border-top: 0;
    height: 0;
    pointer-events: none;
  }
  .result::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    margin: 0 -2px -2px -2px;
    border-radius: inherit;
    background: linear-gradient(105deg, #53285c, rgba(40, 40, 40, 0.2) 5%),
      linear-gradient(260deg, #a38aec, rgba(40, 40, 40, 0.2) 5%);
    transition: opacity 0.4s linear;
    transition-delay: 0.2s;
    opacity: 0;
  }
  .result-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    gap: 16px;
  }
  .result-header::before,
  .result-header::after {
    content: "";
    position: absolute;
    margin: auto;
    z-index: 1;
  }
  .result-header::before {
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      to right,
      #361f3b 0%,
      #1d1721 10%,
      #1a1722 88%,
      #504474 100%
    );
    transition: all 0.2s ease;
    width: 0%;
  }
  .result-header::after {
    right: -59px;
    bottom: 69px;
    box-shadow: 0 0 40px 30px var(--glow-r-color);
    background-color: var(--glow-r-color);
    width: 20%;
    height: 25%;
    filter: blur(40px);
    border-radius: 50%;
    transition: all 0.5s linear;
    transition-delay: 0.3s;
    opacity: 0;
  }
  .result-header > div {
    border-radius: 6px;
    border: 0;
    color: #5e5669;
    background-color: transparent;
    font-size: 13px;
    animation: slideUp 0.4s ease forwards calc(var(--i) * 0.05s);
  }
  .result-header label {
    padding: 10px 10px 15px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }
  .result-header label:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -15px;
    height: 10px;
    width: 100%;
    margin: auto;
    border-radius: 7px 7px 0 0;
    background: #37333d;
    transition: transform 0.3s var(--ease-elastic), background 0.3s linear;
  }
  .result-header label::after {
    content: attr(data-label);
    position: absolute;
    margin: auto;
    text-align: center;
    font-weight: 600;
    opacity: 0;
    color: white;
    filter: blur(6px);
    transform: translateY(-80%);
  }
  .result-header label span {
    display: block;
  }
  .result-header label span,
  .result-header label::after {
    transition: all 0.4s ease;
  }
  [type="radio"]:checked ~ label::after {
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }
  [type="radio"]:checked ~ label span {
    transform: translateY(80%);
    opacity: 0;
    color: white;
    filter: blur(6px);
  }
  .result-header > div:hover label span {
    color: white;
  }
  .result [type="radio"] {
    display: none;
  }
  .result label:hover::before,
  .result [type="radio"]:checked ~ label::before {
    transform: translateY(-10px);
  }
  .result [type="radio"]:checked ~ label::before {
    background: #fff;
    transition: all 0.5s ease;
  }

  .result-content-header {
    display: flex;
    text-align: center;
    color: white;
    background: linear-gradient(to bottom, #16131a 0%, transparent);
    padding: 12px 6px 7px 6px;
    font-size: 12px;
    animation: slideUp 0.5s ease forwards;
  }
  .result-content-header > div {
    width: 100%;
    font-weight: 600;
    animation: slideUp 0.4s ease forwards calc(var(--i) * 0.05s);
  }
  .result-content-header > div span {
    padding-left: 5px;
  }

  .result-content {
    position: relative;
    opacity: 0;
    display: flex;
    flex-direction: column;
  }
  .result-content .lava {
    position: absolute;
    left: 8px;
    right: 8px;
    top: 0;
    height: var(--result-item-h);
    border-radius: 8px;
    background-color: rgb(18, 16, 20);
    transition: all 0.3s ease;
    transform: scaleY(0);
    opacity: 0;
    pointer-events: none;
  }
  .result-content a {
    font-size: 13px;
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    padding: 4px 5px;
    margin: 0;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    z-index: 1;
  }
  .result-content a > div:last-child {
    color: rgb(255 255 124 / 60%);
  }
  .result-content a div {
    padding: 3px 5px;
    width: 100%;
    filter: grayscale(1);
  }
  .result-content a:hover {
    color: white;
  }
  .result-content a:hover div {
    filter: grayscale(0);
  }
  .result-content a:hover ~ .lava {
    opacity: 1;
  }
  .result-content a:nth-child(1):hover ~ .lava {
    transform: translateY(0);
  }
  .result-content a:nth-child(2):hover ~ .lava {
    transform: translateY(var(--result-item-h));
  }
  .result-content a:nth-child(3):hover ~ .lava {
    transform: translateY(calc(var(--result-item-h) * 2));
  }
  .result-content a {
    animation: slideUp 0.4s ease forwards calc(var(--i) * 0.05s);
  }

  @keyframes slideUp {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
      opacity: 0;
      filter: blur(4px);
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(40px);
      filter: blur(5px);
    }
    30% {
      opacity: 1;
      transform: translateY(-4px);
      filter: blur(0);
    }
    50% {
      opacity: 1;
      transform: translateY(3px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  /* Lights */

  .glow {
    width: 20%;
    height: 25%;
    border-radius: 50%;
    opacity: 0.7;
    filter: blur(40px);
    position: absolute;
    margin: auto;
    z-index: -1;
    animation: glow 2s cubic-bezier(0.6, 0, 0.6, 1) infinite;
  }
  @keyframes glow {
    50% {
      width: 30%;
      filter: blur(50px);
    }
  }
  .input .glow {
    width: 10%;
    height: 0px;
    filter: blur(10px);
    opacity: 0.3;
    animation: none;
  }
  .glow.left {
    box-shadow: 0 0 40px 30px var(--glow-l-color);
    background-color: var(--glow-l-color);
    left: 0;
    top: 25%;
  }
  .glow.right {
    box-shadow: 0 0 40px 30px var(--glow-r-color);
    background-color: var(--glow-r-color);
    right: 0;
    bottom: 25%;
  }
  .glow-layer-bg,
  .glow-outline {
    position: absolute;
    border-radius: var(--input-radius);
    overflow: hidden;
  }
  .glow-layer-bg {
    z-index: -1;
    inset: -2px;
    background: rgb(27, 27, 27);
  }
  .glow-outline {
    z-index: 9;
    inset: -1px;
    transition: all 0.3s linear;
    opacity: 0;
  }
  .glow-outline::before {
    position: absolute;
    inset: 0;
    content: "";
    width: 110px;
    height: 420px;
    margin: auto;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(197, 134, 203, 0.5),
      transparent
    );
    animation: spin 3s linear infinite;
    animation-play-state: paused;
  }
  .input-wrapper:hover .glow-outline::before {
    animation-play-state: running;
  }
  .input-wrapper:hover .glow-outline {
    opacity: 1;
  }
  .input-wrapper:focus-within .glow-outline {
    transition-duration: 0.2s;
    opacity: 0;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .glow-layer-1 {
    content: "";
    inset: -2px;
    filter: blur(10px);
    position: absolute;
    border-radius: calc(var(--input-radius) * 1.1);
    background: linear-gradient(152deg, rgb(226 0 255 / 20%), rgb(0 0 0 / 0%) 40%),
      linear-gradient(330deg, rgba(65, 66, 82, 0.9), rgb(0 0 0 / 0%) 40%),
      linear-gradient(40deg, rgba(180, 93, 184, 0.3), rgb(0 0 0 / 0%) 40%),
      linear-gradient(220deg, rgb(81 52 157 / 80%), rgb(0 0 0 / 0%) 40%);
  }
  .glow-layer-1::before,
  .glow-layer-1::after {
    content: "";
    position: absolute;
    width: 30%;
    height: 75%;
    border-radius: 20%;
    box-shadow: 0 0 50px currentColor;
    transition: all 0.5s cubic-bezier(0.6, 0, 0.6, 1);
  }
  .input-wrapper:focus-within .glow-layer-1::before,
  .input-wrapper:focus-within .glow-layer-1::after {
    width: 70%;
    height: 95%;
  }
  .glow-layer-1::before {
    left: 0;
    top: 0;
    background: linear-gradient(to right, #c44e93 40%, transparent 100%);
  }
  .glow-layer-1::after {
    right: 0;
    bottom: 0;
    background: linear-gradient(to left, #584ec4 40%, transparent 100%);
  }
  .glow-layer-2::before,
  .glow-layer-2::after,
  .glow-layer-3::before,
  .glow-layer-3::after {
    content: "";
    position: absolute;
    width: 20%;
    height: 70%;
  }
  .glow-layer-2::before,
  .glow-layer-3::before {
    width: 70%;
    height: 80%;
    border-radius: calc(var(--input-radius) * 1.2) 100% 0 20%;
  }
  .glow-layer-2::after,
  .glow-layer-3::after {
    width: 70%;
    height: 100%;
    border-radius: 0 50% calc(var(--input-radius) * 1.2) 100%;
  }
  .glow-layer-2 {
    inset: -5px;
    position: absolute;
    filter: blur(3px);
    z-index: 2;
  }
  .glow-layer-2::before {
    left: 0;
    top: 0;
    background: radial-gradient(at left top, #ff07b0, transparent 70%);
  }
  .glow-layer-2::after {
    right: 0;
    bottom: 0;
    background: radial-gradient(at right bottom, #7b0ac7, transparent 70%);
  }
  .glow-layer-3 {
    inset: -3px;
    position: absolute;
    z-index: 2;
  }
  .glow-layer-3::before,
  .glow-layer-3::after {
    filter: blur(1.5px);
  }
  .glow-layer-3::before {
    left: 0;
    top: 0;
    background: radial-gradient(at left top, white, transparent 70%);
  }
  .glow-layer-3::after {
    right: 0;
    bottom: 0;
    background: radial-gradient(at right bottom, white, transparent 70%);
  }

  /* States */

  .input input:not(:placeholder-shown),
  .input input:focus {
    width: 360px;
  }

  .input input:not(:placeholder-shown) ~ .reflection::after {
    display: none;
  }

  .input input:focus:not(:placeholder-shown) ~ .icon .magnifier,
  .icon .loading {
    opacity: 0;
  }

  .input input:focus:not(:placeholder-shown) ~ .icon .loading,
  .icon .magnifier {
    opacity: 1;
    transition-delay: 0.3s;
    filter: blur(0px);
    transform: scale(1) translate(none);
  }

  .input input:focus:not(:placeholder-shown) ~ .icon .magnifier {
    transform: scale(1.2) translate(1.7px, 1.7px);
  }

  .input input:not(:placeholder-shown) ~ .result {
    height: 193px;
    transition-delay: 0.8s;
    pointer-events: all;
  }

  .input input:not(:placeholder-shown) ~ .result .result-header::before {
    width: 100%;
    transition-delay: 1.1s;
  }

  .input input:not(:placeholder-shown) ~ .result .result-header::after {
    opacity: 0.7;
    transition-delay: 0.9s;
  }

  .input input:not(:placeholder-shown) ~ .result .result-header > div {
    opacity: 0;
    animation: slideDown 1.4s ease forwards calc(1s + var(--i) * 0.05s);
  }

  .input input:not(:placeholder-shown) ~ .result .result-content-header div {
    opacity: 0;
    animation: slideDown 1.4s ease forwards calc(1.3s + var(--i) * 0.04s);
  }

  .input input:not(:placeholder-shown) ~ .result .result-content a {
    opacity: 0;
    animation: slideDown 1.4s ease forwards calc(1.4s + var(--i) * 0.1s);
  }

  .input input:not(:placeholder-shown) ~ .result .result-content-header {
    opacity: 0;
    animation: fadeIn 1.4s ease forwards 1s;
  }

  .input input:not(:placeholder-shown) ~ .result::before {
    transition-delay: 0.8s;
    opacity: 1;
  }

  .input input:not(:placeholder-shown) ~ .result .result-content {
    animation: visibility 1.4s ease forwards;
  }

  @keyframes visibility {
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }`;

export default Input;
