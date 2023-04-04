import React, {useContext} from 'react'
import Carousel from 'better-react-carousel'
import styled from '@emotion/styled';
import {CafeContext} from '../CafeContext';

//poor visual with odd number of picture
// to solve a problem with empty space, the check for picturesNumber % 2 = 0
// can be added. If number is odd, first picture of array can be added as last one
//(loop effect)
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  
`

export const ImageCarousel = () => {
    const {currentCafe} = useContext(CafeContext);
    if (!currentCafe) {
        return <div>Oops</div>;
    }
    const imageLinks = currentCafe.imageLink;

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
            {imageLinks.map((link: string) => (
                <Carousel.Item key={link}>
                    <StyledImage src={link}/>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}


