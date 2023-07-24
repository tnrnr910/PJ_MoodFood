import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BackgroundImage from '../components/BackgroundImage';
import axios from 'axios';
import Loading from '../components/Loading';

const DetailPage = () => {
  const [isLoading, setIsLoading] = useState('');

  const [sliderImages, setSliderImages] = useState([]);
  console.log('test', sliderImages);
  useEffect(() => {
    const fetchSliderImages = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOODFOOD}/foodimage`);
        setSliderImages(response.data);
      } catch (error) {
        console.log('error');
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      {isLoading ? <Loading /> : <BackgroundImage />}
      <SliderBox>
        {sliderImages.map((item, index) => (
          <SliderContainer key={index}>
            <h1>{item.mood}</h1>
            <CustomSlider {...settings}>
              {item.food.map((image, imageIndex) => (
                <ImageContainer key={imageIndex}>
                  <ImgFood src={image.url} alt={item.foodname} />
                  <H4>{image.foodname}</H4>
                </ImageContainer>
              ))}
            </CustomSlider>
          </SliderContainer>
        ))}
      </SliderBox>
    </>
  );
};

export default DetailPage;

const SliderContainer = styled.div`
  height: 8.75rem;
  margin: 7.5rem;
  padding: 1.25rem 1.25rem 6.25rem 1.25rem;
  color: white;
`;

const ImageContainer = styled.div`
  margin-right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImgFood = styled.img`
  width: 15rem;
  height: 15rem;
`;

const SliderBox = styled.div`
  margin-top: 7.5rem;
  justify-content: center;
  padding-bottom: 10rem;
`;

const H4 = styled.h4`
  color: #fff;
`;
const CustomSlider = styled(Slider)`
  .slick-prev {
    position: absolute;
    top: 40%;
    left: -2.5rem;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 0px;
    color: white;
    cursor: pointer;
  }

  .slick-next {
    position: absolute;
    top: 40%;
    right: -2.5rem;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 0px;
    color: white;
    cursor: pointer;
  }
`;
