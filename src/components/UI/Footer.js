import React  from 'react';
import Link from "@material-ui/core/Link";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default function Footer() {
    return (
        <div>
                <Grid >
                    <Typography noWrap={false} variant="caption" color="textSecondary">
                        {"Made by Xeonus with"} <FavoriteIcon fontSize="small"></FavoriteIcon>  {"for the "}
                        <Link color="inherit" href="https://datamine.network/">
                            Datamine
                        </Link>{" "}
                        {"Community"}
                    </Typography>
                </Grid>

                <Grid>
                    <Typography noWrap={false} variant="caption" color="textSecondary">
                        Donate:
                        <Link color="inherit" href="https://etherdonation.com/d?to=0x91f976b4ebb1b95c96f73835066fd138ed18ca20" target="_blank">
                                0x91f976b4ebb1b95c96f73835066fd138ed18ca20
                        </Link>
                    </Typography>
                </Grid>
        </div>
    );
}