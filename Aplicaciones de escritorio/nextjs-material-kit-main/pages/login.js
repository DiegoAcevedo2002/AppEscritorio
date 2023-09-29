import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardBody from "/components/Card/CardBody.js";
import CardFooter from "/components/Card/CardFooter.js";
import Button from "/components/CustomButtons/Button.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/componentsSections/loginStyle.js";
import { useRouter } from 'next/router'
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles(styles);

export default function SectionLogin() {
  const router = useRouter()
  const auth = useAuth();

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = () => {
    console.log(auth);

    auth.logins(data.email, data.password).then((result) => {
      router.push('/home');
    }).catch((err) => {
      alert(err)
    });
  }

  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Iniciar sesión</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Correo"
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Contraseña"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button onClick={() => handleSubmit()} simple color="primary" size="lg">
                  Iniciar sesión
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
