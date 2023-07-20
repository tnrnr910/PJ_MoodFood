import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';

const SliderContainer = styled.div`
  height: 140px;
  margin: 160px 110px 200px 110px;
  padding: 20px;
  color: white;
`;

const SliderItem = styled.div`
  margin-bottom: 230px;
`;

const ImgFood = styled.img`
  width: 300px;
  height: 300px;
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
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <BackgroundImage />
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
    </>
  );
};

export default DetailPage;
