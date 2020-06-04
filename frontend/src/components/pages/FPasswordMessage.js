import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { head } from "./head.js";
import { getMeta } from "./head.js";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
 bullet1: {
    width: "75%",
    marginTop: "10%",
    marginLeft: "15%",
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
   
  },

}));


export default function Message(props) {
    const classes = useStyles();
return (
  <div className="Content">
    <Navbar props={props} />
    <Card className={classes.bullet1}>
      <CardContent align="center" fontStyle="bold">
        <Typography>
          An email has been sent to the address you provided containing a link
          to reset your password. Please click that link to proceed with setting
          a new password.
        </Typography>
      </CardContent>
    </Card>
    <div>
      <Helmet>
        <title>{head.passwordmessage.title}</title>
        {getMeta(head.passwordmessage)}
      </Helmet>
    </div>
  </div>
);
}

