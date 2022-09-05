import React from 'react'
import './Background.css'
const Background = () => {
  return (
    <>
      <div className='wrapper'>
        <div className='container'>
          <svg
            viewBox='0 0 500 500'
            preserveAspectRatio='xMinYMin meet'
            style={{ zIndex: '-2' }}
          >
            <path
              d='M0, 100 C150, 200 350,
            0 500, 100 L500, 00 L0, 0 Z'
              style={{ 'stroke:': 'none', fill: 'rgb(230,230,250)' }}
            ></path>
          </svg>
        </div>

        <div class='container'>
          <svg
            viewBox='0 0 500 500'
            preserveAspectRatio='xMinYMin meet'
            style={{ zIndex: '-3' }}
          >
            <path
              d='M0, 100 C150, 300 350,
            0 500, 100 L500, 00 L0, 0 Z'
              style={{ stroke: 'none', fill: 'rgba(230,230,250,0.3)' }}
            ></path>
          </svg>
        </div>
      </div>
    </>
  )
}

export default Background
