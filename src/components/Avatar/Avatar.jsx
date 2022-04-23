import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function ImgAvatar({ avatar, firstname }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt={firstname} // todo remplacer dynamiquement le nom
        src={avatar || '/static/images/avatar/1.jpg'}
        sx={{
          // m: 1,
          width: 45,
          height: 45,
          // border: '1px solid black',
        }}
      />
    </Stack>
  );
}

ImgAvatar.propTypes = {
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  firstname: PropTypes.string.isRequired,
};
