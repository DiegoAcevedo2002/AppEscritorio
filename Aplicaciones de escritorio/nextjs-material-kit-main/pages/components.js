import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";


//import custom
import CustomInput from "/components/CustomInput/CustomInput.js";

//import search
import Search from "@material-ui/icons/Search";

//impor tabs
import CustomTabs from "/components/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";

//import getNotes
import { getNotes } from "../services/api/note/note";

//import react
import {useEffect, useState} from 'react';

//import login
import CreateNote from './createNote.js';

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [notas, setNotes] = useState([]);
  useEffect(() => {
    getNotes().then((res) => {
      setNotes(res);
      console.log(res)
    });
  }, []);
  return (
    <div>
        <Header
            brand="NoteVerse"
            color="dark"
            rightLinks={
              <div>
                <CustomInput
                  white
                  inputRootCustomClasses={classes.inputRootCustomClasses}
                  formControlProps={{
                    className: classes.formControl
                  }}
                  inputProps={{
                    placeholder: "Buscar",
                    inputProps: {
                      "aria-label": "Search",
                      className: classes.searchInput
                    }
                  }}
                />
                <Button justIcon style={{marginTop: "20px"}} round color="white">
                  <Search className={classes.searchIcon} />
                </Button>
              </div>
            }
          />

          <CreateNote/>

      <div className={classNames(classes.main, classes.mainRaised)} style={{margin: "10px", padding: "30px"}}>
      <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>Creación de notas</small>
              </h3>
              {notas.map((note) => <CustomTabs
              id={note._id}
                headerColor="primary"
                tabs={[
                  {
                    tabName: `${note.name}`,
                    tabIcon: Face,
                    tabContent: (
                      <p className={classes.textCenter}>
                        {note.content}
                      </p>
                    )
                  },
                ]}
              />)}
              
            </GridItem>
          </GridContainer>
      </div>
    </div>
  );
}
