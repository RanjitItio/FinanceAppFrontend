import { styled } from '@mui/material/styles';


let drawerWidth = 240;


const setDrawerWidth = ()=> {
  if (window.matchMedia('(min-width: 768px)').matches) {
    drawerWidth = 240;
  } else {
    drawerWidth = 0;
  };
};

setDrawerWidth();



export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(

  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);



export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



