import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PageNotFound(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div id="notfound">
        <div class="notfound">
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => {
            //   navigate(`/${props.region_code}/App/Dashboard`);
            // }}
          >
            Go To Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
