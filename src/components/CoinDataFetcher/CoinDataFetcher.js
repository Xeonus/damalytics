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

class CoinDataFetcher extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
        loading: true,
        coinData: null,
      };
    }


  async componentDidMount() {
    console.log("CoinDataFetcher Props mount: ", this.props)
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=flux%2Cdatamine%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const response = await fetch(url);
    const json = await response.json();
    const coinData = json;
    this.setState({
      coinData: {...coinData},
      coinDataSize: coinData.length,
      loading: false
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    }



    );
    //this.interval = setInterval(() => this.setState({ time: Date.now() }), 5000);
    // call getData() again in 5 seconds
    //this.state.intervalID = setTimeout(this.getData.bind(this), 5000);
  }

  componentWillUnmount() {
    //clearInterval(this.state.time);
  }

  render() {


    const { classes } = this.props;
    //console.log("intervalTrigger", this.interval);


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
        const dataEntry = createData(this.state.coinData[i].name, this.state.coinData[i].current_price, this.state.coinData[i].ath, this.state.coinData[i].atl, this.state.coinData[i].market_cap);
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
                 <TableCell align="left">{row.marketCap}</TableCell>
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