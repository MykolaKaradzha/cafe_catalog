import React from 'react'
import Carousel from 'better-react-carousel'

//poor visual with odd number of picture
// to solve a problem with empty space, the check for picturesNumber % 2 = 0
// can be added. If number is odd, first picture of array can be added as last one
//(loop effect)

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
            <Carousel.Item>
                <img width="100%" src="https://picsum.photos/800/600?random=6" />
            </Carousel.Item>
        </Carousel>
    )
}


