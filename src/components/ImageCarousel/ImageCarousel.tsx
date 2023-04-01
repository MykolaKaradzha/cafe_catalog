import React from 'react'
import Carousel from 'better-react-carousel'

export const ImageCarousel = () => {
    return (
        <Carousel
            responsiveLayout={
                [
                    {
                        breakpoint: 600,
                        cols: 1,
                        rows: 1,
                        gap: 30,
                        loop: true,
                        autoplay: 5000
                    },
                    {
                        breakpoint: 5000,
                        cols: 2,
                        rows: 1,
                        gap: 30,
                        loop: true,
                        autoplay: 5000
                    },
                ]}
            mobileBreakpoint={300}
        >
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=1" />
            </Carousel.Item>
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=2" />
            </Carousel.Item>
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=3" />
            </Carousel.Item>
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=4" />
            </Carousel.Item>
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=5" />
            </Carousel.Item>
        </Carousel>
    )
}
// import React, { Component } from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
//
// export const ImageCarousel = () => (
//             <Carousel>
//                 <div>
//                     <img src="https://picsum.photos/800/600?random=2" />
//                     <p className="legend">Legend 1</p>
//                 </div>
//                 <div>
//                     <img src="https://picsum.photos/800/600?random=9" />
//                     <p className="legend">Legend 2</p>
//                 </div>
//                 <div>
//                     <img src="https://picsum.photos/800/600?random=5" />
//                     <p className="legend">Legend 3</p>
//                 </div>
//                 <div>
//                     <img src="https://picsum.photos/800/600?random=4" />
//                     <p className="legend">Legend 3</p>
//                 </div>
//                 <div>
//                     <img src="https://picsum.photos/800/600?random=12" />
//                     <p className="legend">Legend 3</p>
//                 </div>
//             </Carousel>
// );

