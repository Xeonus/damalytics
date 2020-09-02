import React from "react";
import Grid from '@material-ui/core/Grid';
import CoinDataFetcher from "../CoinDataFetcher/CoinDataFetcher";

export default function CoinStatistics(props) {

        return (
        //TODO: Iterate through all CoinData Elements we want to display (FLX, ETH, DAM)
        <div>
            <Grid>
                <CoinDataFetcher props = {props}></CoinDataFetcher>
            </Grid>
        </div>
        );

    
}