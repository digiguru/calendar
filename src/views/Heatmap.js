import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
const styleContainer = (columns, rows) => {
  const colText = Array(columns).fill("[column] 2fr").join(" ");
  const rowText = Array(rows).fill("[row] 2fr").join(" ");
  return {
    display: 'grid',
    border: '1px',
    gridTemplateColumns: `[first] 400px ${colText} [last] 1fr`,
    gridTemplateRows: `[first] 1fr ${rowText} [last] 1fr`,
    gridAutoFlow: "column"
  }
};
const styleCell = (column, row) => {
  return {
    gridColumn: column,
    gridRow: row,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}
const styleCentered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}
const styleCenteredRight = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
}

const styleGreen = {
    border: "1px green solid"
  };
const styleYellow = {
    border: "1px yellow solid"
  }
const styleRed = {
    border: "1px red solid"
  };
  const getRatingStyle = (rating) => {
    return rating > 66 ? styleGreen : (rating < 34 ? styleRed : styleYellow);
  }
function Heatmap(props) {
  const { classes, areas, domains, cells } = props;
  return (
    <div style={styleContainer(areas.length, domains.length)}>
    
    {/* <Paper style={styleCell(1,1)} className={classes.paper}>Domains</Paper> */}
    
      {domains.map((item, index) => (
        <Paper key={"domain" + index} style={ {...styleCell(1,index+2), ...styleCenteredRight}} className={classes.paper}>{item}</Paper>
      ))}
      <Paper style={styleCell(1,domains.length+2)} className={classes.paper}><input type='text' placeholder="add domain" onClick={(event) => props.onAddDomain(event.currentTarget.placeholder)} /></Paper>
      {areas.map((area, areaIndex) => (
          <React.Fragment key={"area" + areaIndex}>
              <Paper style={styleCell(areaIndex+2,1)}  className={classes.paper}>{area}</Paper>
            {cells[areaIndex].map(({value, rating}, indexCell) => (
              <Paper key={"cell" + areaIndex + "-" + indexCell} style={ {...styleCell(areaIndex+2,indexCell+2), ...getRatingStyle(rating), ...styleCentered }} className={classes.paper}>{value}</Paper>
            ))}
          </React.Fragment>
      ))}
      <Paper style={styleCell(areas.length+2,1)} className={classes.paper}><input type='text' placeholder="add area" onClick={(event) => props.onAddArea(event.currentTarget.placeholder)} /></Paper>
    </div>
  );
}

Heatmap.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Heatmap);