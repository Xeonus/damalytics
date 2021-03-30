import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


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
    this.mounted = false;
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
    var today = new Date();
    var time = today.toLocaleTimeString();
    this.setState((state) => ({
      coinData: { ...coinData },
      coinDataSize: coinData.length,
      loading: false,
      time: time,
    }), () => {
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

  //Fetch DAM in ETH/DAM Pool:
  async fetchDamEthUni() {
    const damEth_url = "https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xF80D589b3Dbe130c270a69F1a69D050f268786Df&address=0x447f8d287120b66f39856ae5ceb01512a7a47444&tag=latest&apiKey=X1GWUZ7J7M2G9C4VIIHY2VKFQB8H7KNW76"
    const damEth_response = await fetch(damEth_url);
    const damEth_json = await damEth_response.json();
    const bigIntDamEth = damEth_json.result / 1000000000000000000;
    if (damEth_json.status !== "0") {
    this.props.onchange({
      ...this.props.data,
      damEthUniswap: Number(bigIntDamEth.toFixed(2)),
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
    this.mounted = true;
    this.fetchData();
    this.fetchGlobalDamLockedIn();
    this.fetchDamEthUni();
    this.fetchGlobalFluxBurned();
    //Fetch coin data every 60 seconds
    this.inverval = setInterval(() => {
      if (this.mounted) {
      this.fetchData()
      }
    },60000);

    //Fetch contractData every 120 seconds
    this.contractInterval = setInterval(() => {
      this.fetchGlobalDamLockedIn();
      this.fetchGlobalFluxBurned();
    },120000);

    //Update data here as a test:
    if (this.state.coinData !== null && this.state.coinData !== this.props.coinData) {
      //Update important components:
      //this.setState ({
       // damPrice : this.state.coinData[1].current_price,
        //fluxPrice : this.state.coinData[2].current_price,
      //});
      this.props.data.coinData = this.state.coinData;
      //Map dam- and flux-prices:
      this.props.data.damPrice = this.state.coinData[1].current_price;
      this.props.data.fluxPrice = this.state.coinData[2].current_price;
      }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.contractInterval);
    this.mounted = false;
  }


  render() {
    const { classes } = this.props;

    function createData(name, currentPrice, allTimeHigh, allTimeLow, marketCap) {
      return { name, currentPrice, allTimeHigh, allTimeLow, marketCap };
    }

    //The default return object is parsed and used in CoinStatistics to display
    if (this.state.loading) {
      return (
        <div component="span"><CircularProgress /></div>
      )
    }

    //No data could be fetched
    if (!this.state.coinData[2].current_price) {

      return (
        <div component="span">Could not fetch any price data...</div>

      )
    }

    if (this.state.coinData[2].current_price !== null) {
      //Map props to data:
      this.props.data.coinData = this.state.coinData;
      //Map dam- and flux-prices:
      this.props.data.damPrice = this.state.coinData[1].current_price;
      this.props.data.fluxPrice = this.state.coinData[2].current_price;
      //useEffect(() => { this.props.data.damPrice = this.state.coinData[1].current_price}, []);
      //Only initialize data when it has been fully mounted before render
      const rows = [
      ];

      for (var i = 0; i <= 2; i++) {
        const dataEntry = createData(this.state.coinData[i].symbol.toUpperCase(), this.state.coinData[i].current_price, this.state.coinData[i].ath, this.state.coinData[i].atl, this.state.coinData[i].market_cap);
        rows.push(dataEntry);
      }
      return (
        <div>
        <TableContainer>
          <Table className={classes.table} size="small" aria-label="a dense table">
          <caption>Price data fetched through Coingecko API. Last upate: {this.state.time}</caption>
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
                <Box m={1}>
                <Typography variant="caption" display="block" gutterBottom color="primary" component="span">
                
                </Typography>
            </Box>
            </div>
      );
    }
  }
}

export default (withStyles(styles)(CoinDataFetcher))