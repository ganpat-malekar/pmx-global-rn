import Slider from 'react-slick';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import Slider1 from '@paymate/common/assets/Slider1.jpg';
import Slider2 from '@paymate/common/assets/Slider2.jpg';
import Slider3 from '@paymate/common/assets/Slider3.jpg';

const useStyles = makeStyles((theme) => ({
  SliderTab: {
    '& #mainHead': {
      fontSize: '31px',
      fontWeight: '600',
      margin: 0,
      color: '#fff',
    },
    '& #subHead': {
      fontSize: '20px',
      fontWeight: '500',
      margin: 0,
      color: '#fff',
    },
    '& #caption': {
      fontSize: '12px',
      color: '#fff',
    },
    '& button': {
      backgroundColor: '#00FF91',
      color: '#3f3f3f',
      textTransform: 'capitalize',
    },
  },
}));

function SliderLogin(props) {
  const classes = useStyles();

  const settings = {
    autoplay: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <Slider {...settings}>
      <div className={classes.SliderTab}>
        <img style={{ width: '100%' }} src={Slider1} />
        <Stack
          sx={{
            position: 'absolute',
            zIndex: 100,
            bottom: '76px',
            marginLeft: '29px',
          }}
          direction={'column'}
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography id="mainHead">One-stop platform for SMEs</Typography>
          <Typography id="subHead">
            Business Payments. Supply Chain Automation. <br />
            Credit. Invoice Financing
          </Typography>
        </Stack>
      </div>
      <div>
        <div className={classes.SliderTab}>
          <img style={{ width: '100%' }} src={Slider2} />
          <Stack
            sx={{
              position: 'absolute',
              zIndex: 100,
              bottom: '76px',
              marginLeft: '29px',
            }}
            direction={'column'}
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography id="mainHead">Improve Cashflows</Typography>
            <Typography id="subHead">
              Discount vendor payments for better margins
            </Typography>
          </Stack>
        </div>
      </div>
      <div>
        <div className={classes.SliderTab}>
          <img style={{ width: '100%' }} src={Slider3} />
          <Stack
            sx={{
              position: 'absolute',
              zIndex: 100,
              bottom: '76px',
              marginLeft: '29px',
            }}
            direction={'column'}
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography id="mainHead">
              Best Fintech - Payments
              <br /> 2021
            </Typography>
          </Stack>
        </div>
      </div>
    </Slider>
  );
}

SliderLogin.propTypes = {};

export default SliderLogin;
