import React from 'react'
import Carousel from 'better-react-carousel'
import styled from '@emotion/styled';

//poor visual with odd number of picture
// to solve a problem with empty space, the check for picturesNumber % 2 = 0
// can be added. If number is odd, first picture of array can be added as last one
//(loop effect)
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  
`

export const ImageCarousel = () => {

    return (
        <Carousel
            responsiveLayout={
                [
                    {
                        breakpoint: 900,
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
                <StyledImage src="https://images2.imgbox.com/25/8b/cqsPJe0G_o.jpeg" />
            </Carousel.Item>
            <Carousel.Item>
                <StyledImage src="https://images2.imgbox.com/4b/94/iEITILZ9_o.jpeg" />
            </Carousel.Item>
            <Carousel.Item>
                <StyledImage src="https://images2.imgbox.com/25/59/THO6lykH_o.jpeg" />
            </Carousel.Item>
            <Carousel.Item>
                <StyledImage src="https://images2.imgbox.com/49/60/kbB5kEJM_o.jpeg" />
            </Carousel.Item>
            <Carousel.Item>
                <StyledImage src="https://images2.imgbox.com/24/4f/dytnG1BG_o.jpeg" />
            </Carousel.Item>
            <Carousel.Item>
                <StyledImage src="https://picsum.photos/800/600?random=6" />
            </Carousel.Item>
        </Carousel>
    )
}


