import { style } from '@vanilla-extract/css';
import exp from 'constants';

export const profileWrapper = style({
  position: 'relative',
  display: 'flex',
  width: 120,
  height: 120,
  borderRadius: '50%',
});

export const editButton = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 28,
  height: 28,
  padding: 0,
  cursor: 'pointer',
});
