import { Stack, Skeleton } from '@mui/material';

import { formUseStyles } from '@paymate/common/style';

const TableLoaderSkeleton = (props) => {
  const classes = formUseStyles();

  return (
    <div className={classes.TableLoaderStack}>
      <div align="right" className={classes.first}>
        <Skeleton animation="wave" variant="text" width={100} height={70} />
      </div>
      <div>
        <Stack spacing={2}>
          {[...Array(props.numberOfBones)].map((item, index) => {
            return (
              <Skeleton
                sx={{ borderRadius: '4px' }}
                key={index}
                animation="wave"
                variant="rectangular"
                width={'100%'}
                height={80}
              />
            );
          })}
        </Stack>
      </div>
      <div className={classes.last} align="right">
        <Skeleton animation="wave" variant="text" width={400} height={70} />
      </div>
    </div>
  );
};

export default TableLoaderSkeleton;
