import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  table: {
    overflow: 'auto',
    minWidth: 0,
  },
  tableCell: {
    paddingRight: 1,
    paddingLeft: 1
  }
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class CoinDataFetcher extends Component {

  //Obsolete constructor
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      coinData: null,
      globalDamLockedIn: null,
      globalFluxBurned: null,

    };
  };

  //Fetch Coin Metrics
  async fetchData() {
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=flux%2Cdatamine%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const response = await fetch(url);
    const json = await response.json();
    const coinData = json;
    this.setState({
      coinData: { ...coinData },
      coinDataSize: coinData.length,
      loading: false,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    }
    );
  }

  //Fetch Global DAM locked In
  async fetchGlobalDamLockedIn() {
    const dam_url = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xF80D589b3Dbe130c270a69F1a69D050f268786Df&address=0x469eda64aed3a3ad6f868c44564291aa415cb1d9&tag=latest&apiKey=X1GWUZ7J7M2G9C4VIIHY2VKFQB8H7KNW76"
    const dam_response = await fetch(dam_url);
    const dam_json = await dam_response.json();
    const bigIntDam = dam_json.result / 1000000000000000000;
    if (dam_json.status !== "0") {
    this.props.onchange({
      ...this.props.data,
      globalDamLockedIn: Number(bigIntDam.toFixed(2)),
    });
  }
  }

  //Fetch Gloabl Flux Burned
  async fetchGlobalFluxBurned() {
    const flux_url = "https://api.etherscan.io/api?module=proxy&action=eth_call&to=0x469eDA64aEd3A3Ad6f868c44564291aA415cB1d9&data=0x38ee5fb10d9bfdd402fe81635431334ee462f34beb87a7e17b185174d01316cc&apiKey=X1GWUZ7J7M2G9C4VIIHY2VKFQB8H7KNW76"
    const flux_response = await fetch(flux_url);
    const flux_json = await flux_response.json();
    const bigIntFlux = parseInt(flux_json.result) / 1000000000000000000;
    if (flux_json.status !== "0") {
    this.props.onchange({
      ...this.props.data,
      globalFluxBurned: Number(bigIntFlux.toFixed(2)),
    });
  }
  }

  componentDidMount() {
    //Set interval for automatic refresh
    this.fetchData();
    this.fetchGlobalDamLockedIn();
    this.fetchGlobalFluxBurned();
    //Fetch coin data every 60 seconds
    this.inverval = setInterval(() => {
      this.fetchData()
    },60000);

    //Fetch contractData every 120 seconds
    this.contractInterval = setInterval(() => {
      this.fetchGlobalDamLockedIn();
      this.fetchGlobalFluxBurned();
    },120000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.contractInterval);
  }

  render() {
    const { classes } = this.props;

    function createData(name, currentPrice, allTimeHigh, allTimeLow, marketCap) {
      return { name, currentPrice, allTimeHigh, allTimeLow, marketCap };
    }

    //The default return object is parsed and used in CoinStatistics to display
    if (this.state.loading) {
      return (
        <div ><CircularProgress /></div>
      )
    }

    //No data could be fetched
    if (!this.state.coinData[2].current_price) {

      return (
        <div>Could not fetch any price data...</div>

      )
    }

    if (this.state.coinData[2].current_price !== null) {
      //Map props to data:
      this.props.data.coinData = this.state.coinData;
      //Only initialize data when it has been fully mounted before render
      const rows = [
      ];

      for (var i = 0; i <= 2; i++) {
        const dataEntry = createData(this.state.coinData[i].symbol.toUpperCase(), this.state.coinData[i].current_price, this.state.coinData[i].ath, this.state.coinData[i].atl, this.state.coinData[i].market_cap);
        rows.push(dataEntry);
      }
      return (
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow >
                <TableCell align="left">Currency</TableCell>
                <TableCell align="left">Price ($)</TableCell>
                <TableCell align="left">All-time high price ($)</TableCell>
                <TableCell align="left">All-time low price ($)</TableCell>
                <TableCell align="left">Market Cap ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.currentPrice}</TableCell>
                  <TableCell align="left">{row.allTimeHigh}</TableCell>
                  <TableCell align="left">{row.allTimeLow}</TableCell>
                  <TableCell align="left">{numberWithCommas(row.marketCap)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  }
}

export default (withStyles(styles)(CoinDataFetcher))