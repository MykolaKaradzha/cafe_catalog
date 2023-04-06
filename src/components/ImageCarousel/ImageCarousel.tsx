import React, {useContext} from 'react'
import Carousel from 'better-react-carousel'
import styled from '@emotion/styled';
import {CafeContext} from '../../context/CafeContext';

//poor visual with odd number of picture
// to solve a problem with empty space, the check for picturesNumber % 2 = 0
// can be added. If number is odd, first picture of array can be added as last one
//(loop effect)
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`

type Props = {
    images: string[]
}

export const ImageCarousel: React.FC<Props> = ({ images}) => {

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
                        autoplay: 10000
                    },
                    {
                        breakpoint: 5000,
                        cols: 2,
                        rows: 1,
                        gap: 30,
                        loop: true,
                        autoplay: 10000
                    },
                ]}
            mobileBreakpoint={300}
        >
            {images.map((img: string) => (
                <Carousel.Item key={img}>
                    <StyledImage src={img}/>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}


