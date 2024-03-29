import React, {useRef} from 'react';
import { Carousel, Avatar, Space, Button, Input, Tooltip } from 'antd';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/navbar.css'



const contentStyle = {
  margin: "1px",
//   height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CarouselStyle = {
    color: "red",
    background: 'blue'
};


function ScrollBar () {
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null);

  const scrollToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const onChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
    // console.log(currentSlide);
  };



  return (
    <>
    <Carousel afterChange={onChange} slidesToShow={5} slidesToScroll={5} infinite={true} swipeToSlide={true} draggable ref={carouselRef}>
      <div>
      <Space direction="vertical" size={16} className='mx-2 my-5' >
            <Avatar size={64} icon={<UserOutlined />} src='' style={contentStyle} />
        </Space>
      </div>

      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />} style={contentStyle} />
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />} style={contentStyle} />
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />}  style={contentStyle}/>
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />}  style={contentStyle}/>
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />}  style={contentStyle}/>
        </Space>
      </div>
      <div>
        <Space direction="vertical" size={16} className='mx-2 my-5'>
            <Avatar size={64} icon={<UserOutlined />}  style={contentStyle}/>
        </Space>
      </div>
    </Carousel>

    <div style={{ textAlign: 'center', marginTop: '5px' }}>
      <Button onClick={scrollToPrev} style={{ marginRight: '10px' }}>Previous</Button>
      <Button onClick={scrollToNext}>Next</Button>
    </div>

    <div className="d-flex justify-content-between">
      <Input
        className='w-75 my-2'
        placeholder="Enter the amount"
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Extra information">
            <InfoCircleOutlined
              style={{
                color: 'rgba(0,0,0,.45)',
              }}
            />
          </Tooltip>
        }
      />
      <button type="button" className="btn btn-sm btn-primary rounded-3">
      <b><i className="bi bi-send" style={{color: "white"}}></i></b> &nbsp;
      <b>Send</b></button>
    </div>
    </>
  );
};



export default ScrollBar;