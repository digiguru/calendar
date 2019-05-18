import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function Heatmap(props) {
  const { classes } = props;
  
  const areas = [
    "Area 1",
    "Area 2"
  ];

  const rawData = [
    {domain:"Domain 1", data:["Good", "Bad"] },
    {domain:"Domain 2", data:["Bad", "Bad"] },
    {domain:"Domain 3", data:["Good", "Good"] }
  ]
  return (
    <div className={classes.root}>
       
      <Grid container spacing={3}>
        <Grid item>
          <Paper className={classes.paper}>Domains</Paper>
        </Grid>
      {areas.map((item, index) => (
        <Grid item>
          <Paper className={classes.paper}>{item}</Paper>
        </Grid>
      ))}
      </Grid>
        {rawData.map(({domain, data}, index) => (
          <Grid container  spacing={3}>>
            <Grid item>
              <Paper className={classes.paper}>{domain}</Paper>
            </Grid>
            {data.map((cell, indexCell) => (
              <Grid item>
                <Paper className={classes.paper}>{cell}</Paper>
              </Grid>
            ))}
            </Grid>
          ))}
        
   
    </div>
  );
}

Heatmap.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Heatmap);