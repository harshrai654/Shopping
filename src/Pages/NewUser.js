import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "../Components/LoginForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NewUser = () => {
  const classes = useStyles();
  console.log(classes);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shopping
          </Typography>
        </Toolbar>
      </AppBar>
      <LoginForm />
    </div>
  );
};

export default NewUser;
