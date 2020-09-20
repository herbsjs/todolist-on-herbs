import { makeStyles } from '@material-ui/core/styles'

function Style() {
  //Definitions
  const drawerWidth = 500

  const customStyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: '#333333',
      color: '#c8bb93',
      zIndex: 50,
    },
    drawer: {
      width: drawerWidth,
      position: 'relative',
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      zIndex: 45,
    },
    toolbar: theme.mixins.toolbar,
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }))

  return customStyle()
}

export default Style
