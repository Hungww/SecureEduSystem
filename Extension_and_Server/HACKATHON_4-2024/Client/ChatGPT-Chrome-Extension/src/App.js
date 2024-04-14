import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import Button from "@mui/material/Button";
import { Divider } from "./components/Divider";
import { Loader } from "./components/Loader";
import { Textarea } from "./components/Textarea";
import { Response } from "./components/Response";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  function Ham() {
    return (
      <div className="flex">
        <CheckCircleIcon color="success" />
        <h1 className=" text-green-500 font-semibold">
          Authentic url
        </h1>
      </div>
    );
  }
  function Scam() {
    return (
      <div className="flex ">
        <CancelIcon color="error" />
        <h1 className=" text-red-600 font-semibold">
         Can be fake{" "}
        </h1>
      </div>
    );
  }

  function Response() {
    if(gotScan){
      return(
        <div className="flex flex-col w-[100%]">
          <div className="flex flex-row items-center mt-4">
          <h1 className="text-black text-xl font-medium px-1">Scan database: </h1>
          {isFakelink ? <Scam></Scam> : <Ham></Ham>}
          </div>

          <div className="flex flex-col justify-center mt-4">
            <h1 className="text-black text-xl font-medium">Virus total summary: </h1>
            <div className="ml-4">
            <h1 className=" text-red-500 text-base font-medium">Malicious: {last_analysis_stats.malicious}</h1>
            <h1 className=" text-yellow-500 text-base font-medium">Suspicious: {last_analysis_stats.suspicious}</h1>
              
              <h1 className=" text-green-600 text-base font-medium">Harmless: {last_analysis_stats.harmless}</h1>
          
              


            </div>
            <div className="flex flex-col justify-center mt-4">
              <h1 className="text-black text-xl font-medium">Total votes: </h1>
              <div className="ml-4">
              <h1 className=" text-green-500 text-base font-medium">Harmless: {totalVotes.harmless}</h1>
              <h1 className=" text-red-500 text-base font-medium">Malicious: {totalVotes.malicious}</h1>

                
              </div>
              

            </div>
            
            </div>
          
          
        </div>
      )
    }
  }
  async function getData() {
    try {
      const response = await fetch(
        "http://172.28.241.21:5000/api/v1/url_check?target=" + inputValue
      );
      console.log(response);
      const data = await response.json();
      console.log(data.last_analysis_stats);
      setLast_analysis_stats(data.last_analysis_stats);

      console.log("RESSS", data.res);
      setIsFakelink(data.res);

      console.log(data.total_votes);
      setTotalVotes(data.total_votes);

      console.log(data.message);
      const concatallScan = data.malicious_results
        .concat(data.suspicious_results)
        .concat(data.harmless_results);
      console.log("Concat", concatallScan);
      setAllScan(concatallScan);

      setGotScan(true);
    } catch (error) {
      console.log(error);
    }
  
  }

  // return (
  // 	<div className="  bg-sky-300 w-80  h-96 flex flex-col justify-center items-center border-white border-8 rounded-lg" >
  // 		<h1 className=" text-white text-2xl font-bold">
  // 			Input your Url:
  // 		</h1>
  // 		<input type="text" className="border-2 h-10 w-72 rounded-lg mt-6 px-4"

  // 		onChange={(e) => {
  // 			setInputValue(e.target.value);

  // 		}}
  // 		/>
  // 		<Response></Response>

  // 		<div className="flex mt-2">
  // 			<Button variant="contained" color="success" className="mt-4"
  // 			  onClick={() => {
  // 				getData();

  // 			  }}

  // 			>Submit</Button>

  // 		</div>

  // 	</div>
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [gotScan, setGotScan] = useState(false);
  const [last_analysis_stats, setLast_analysis_stats] = useState({});
  const [allScan, setAllScan] = useState([]);
  const [totalVotes, setTotalVotes] = useState({});
  const [isFakelink, setIsFakelink] = useState(false);
  return (
    <Box className=" w-72">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="URL" {...a11yProps(0)} />
          <Tab label="Email" {...a11yProps(1)} />
          <Tab label="Scan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className=" w-80 ">
        <div  className=" flex flex-col justify-center items-center  ">
          <h1 className=" text-black text-2xl font-bold">Input your Url:</h1>
          <input
            type="text"
            className="border-2 h-10 w-64 rounded-lg mt-4 px-4"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          

          <div className="flex mt-2">
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              onClick={() => {
                getData();
              }}
            >
              Submit
            </Button>
            
          </div>
          <Response></Response>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

export default App;
