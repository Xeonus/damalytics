import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Title(props) {
  return (
    <Box p={2}>
    <Typography component="h2" variant="h5" color="secondary" >
      {props.children}
    </Typography>
    </Box>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
