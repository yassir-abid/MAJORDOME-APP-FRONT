import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function ImgAvatar({ avatar = '/static/images/avatar/1.jpg' }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        alt="Your Name" // todo remplacer dynamiquement le nom
        src={avatar}
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  );
}

ImgAvatar.propTypes = {
  avatar: PropTypes.string.isRequired,
};
