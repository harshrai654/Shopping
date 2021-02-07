import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CardHeader,
  Divider,
} from "@material-ui/core";

const LoginForm = () => {
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      style={{ marginTop: "8%" }}
    >
      <Card variant="outlined" style={{ padding: "2%" }}>
        <CardHeader title="Login" />
        <Divider />
        <CardContent>
          <TextField label="Email" type="email" />
          <br />

          <TextField label="Password" type="password" />
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" color="primary">
            SignIn
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LoginForm;
