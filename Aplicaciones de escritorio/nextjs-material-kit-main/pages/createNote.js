import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";

// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/LoginPage.js";

//import clasname
import classNames from "classnames";

//import set
import { insertNotes } from "../services/api/note/note";

//import useState
import {useState} from 'react';

const useStyles = makeStyles(styles);

export default function CreateNote() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    content: '',
  });

  const handleSubmit = () => {
    console.log(formData)
    insertNotes(formData)
      .then(() => {
        alert("Creación exitosa")
      })
      .catch(() => {
        alert("Error al crear")
      });
  };

  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)} style={{marginTop: "-80px"}}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Creación de nota</h4>
                  </CardHeader>
                  <p className={classes.divider}>Podras crear tus notas personles</p>
                  <CardBody>
                    <CustomInput
                      labelText="Titulo de la nota"
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(e)=> {console.log(e)
                        setFormData({...formData, name:e.target.value})}}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Descripcion de la nota"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      onChange={(e)=> {setFormData({...formData, content:e.target.value})}}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={()=> handleSubmit()}>
                      Crear
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
