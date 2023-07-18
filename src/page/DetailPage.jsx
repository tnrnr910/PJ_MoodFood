import React, { useState } from 'react';
import { styled } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BackgroundImage from '../components/BackgroundImage';

const SliderContainer = styled.div`
  margin: 160px 110px 300px 110px;
  padding: 20px;
  color: white;
`;

const SliderItem = styled.div`
  margin-bottom: 20px;
`;

const DetailPage = () => {
  const [sliderImages, setSliderImages] = useState([
    {
      title: '기쁨',
      images: [
        { id: 1, image: 'happy1.jpg' },
        { id: 2, image: 'happy2.jpg' }
      ]
    },
    {
      title: '분노',
      images: [
        { id: 1, image: 'mad1.jpg' },
        { id: 2, image: 'mad2.jpg' }
      ]
    },
    {
      title: '슬픔',
      images: [
        { id: 1, image: 'sad1.jpg' },
        { id: 2, image: 'sad2.jpg' }
      ]
    },
    {
      title: '즐거움',
      images: [
        { id: 1, image: 'funny1.jpg' },
        { id: 2, image: 'funny2.jpg' }
      ]
    }
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <BackgroundImage />
      {sliderImages.map((sliderImage, index) => (
        <SliderContainer key={index}>
          <h2>{sliderImage.title}</h2>
          <Slider {...settings}>
            {sliderImage.images.map((image, imageIndex) => (
              <SliderItem key={imageIndex}>
                <img src={image.image} alt={sliderImage.title} />
              </SliderItem>
            ))}
          </Slider>
        </SliderContainer>
      ))}
    </>
  );
};

export default DetailPage;
