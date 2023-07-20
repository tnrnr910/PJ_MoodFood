import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';

const SliderContainer = styled.div`
  height: 140px;
  margin: 120px;
  padding: 20px;
  color: white;
`;

const SliderItem = styled.div``;

const ImgFood = styled.img`
  width: 12rem;
  height: 12rem;
`;

const SliderBox = styled.div`
  margin-top: 7.5rem;
`;

const DetailPage = () => {
  const [sliderImages, setSliderImages] = useState([]);
  console.log('test', sliderImages);
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await axios.get('http://localhost:4000/foodimage');
        setSliderImages(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    fetchSliderImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
  };
  return (
    <>
      <BackgroundImage />
      <SliderBox>
        {sliderImages.map((item, index) => (
          <SliderContainer key={index}>
            <h2>{item.mood}</h2>
            <Slider {...settings}>
              {item.food.map((image, imageIndex) => (
                <SliderItem key={imageIndex}>
                  <ImgFood src={image.url} alt={item.foodname} />
                </SliderItem>
              ))}
            </Slider>
          </SliderContainer>
        ))}
      </SliderBox>
    </>
  );
};

export default DetailPage;
