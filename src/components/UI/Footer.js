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
                        <Link color="inherit" href="https://etherdonation.com/d?to=0xf9e0dE629DE67eC90FBe095d2e6843f6A76aeEc2" target="_blank">
                            0xf9e0dE629DE67eC90FBe095d2e6843f6A76aeEc2
                        </Link> <br />
                        Alpha Build v0.2.2
                    </Typography>
                </Grid>
        </div>
    );
}