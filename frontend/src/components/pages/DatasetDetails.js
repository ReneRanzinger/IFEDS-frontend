import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenuAppBar from "./MenuAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";


import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {Dataset} from '../../apiCalls'
import { ListItem } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 300
  },
  bullet: {
    display: "inline-block",
    margin: "10 px",
    transform: "scale(0.9)"
  },
  title: {
    fontSize: 30
  },
  pos: {
    marginBottom: 12
  },
  root: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2)
  },

  align: {
    float: "right",
    marginTop: -270,
    marginRight: 200,
    display: "flex",
    justifyContent: "flex-end"
  },

  align1: {
    float: "right",
    marginTop: 0,
    marginRight: -330,
    display: "flex",
    justifyContent: "flex-end"
  },

  bullet0: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  bullet1: {
    width: "60%",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  bullet2: {
    width: 300,
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },

  bullet3: {
    width: "60%",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },

  menu: {
    width: 200
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const handleClick = () => {
     alert("");
   };
  


   const DatasetDetails = props => {

     const classes = useStyles();
     const [dataset, setDataset] = useState([]);
     const [sample, setSample] = useState([]);
     const [sampleDescriptors, setSampleDescriptors] = useState([]);
     const [experimentTypes, setExperimentTypes] = useState([]);
     const [papers, setPapers] = useState([]);
     const [keywords, setKeywords] = useState([]);
     const [provider, setProvider] = useState([]);
     const [fundingSources, setFundingSources] = useState([]);
     const [dataFiles, setDataFiles] = useState([]);
     const [error, setError] = useState(null);
     const isAuthenticated = useSelector(state => state.user.token);


     useEffect(() => {
       const {
         match: { params }
       } = props;
       console.log(params);
       fetch(`${Dataset}/${params.id}`,
          {method:"GET",
          headers: setAuthorizationHeader(isAuthenticated)})
         .then(response => {
           console.log(response);
           return response.json();
         })


       .then(details => {
           // console.log(details)
           setDataset(details);
           setSample(details.sample);
           setSampleDescriptors(details.sample.sampleDescriptors);
           setExperimentTypes(details.experimentTypes);
           setPapers(details.papers);
           setKeywords(details.keywords);
           setProvider(details.provider);
           setFundingSources(details.fundingSources);
           setDataFiles(details.dataFiles);
         })

         //console.log(JSON.stringify(  sampleDescriptors)+"testtt");
         // console.log("state",   details.value);
         // console.log(JSON.stringify("state"));

         .catch(error => console.log(error));
     }, []);



     return (
       <div>
         <div>
           <MenuAppBar props={props} />
         </div>

         <div>
           <Card className={classes.bullet1}>
             <div>
               <h3 style={{ color: "Purple", marginTop: "0px" }}>
                 {dataset.datasetName}
               </h3>
               <h3 style={{ color: "#5bc0be", marginBottom: "0px" }}></h3>
               <Divider />
               {/* <h2 style={{ color: "Purple" }} className={classes.title}>
                   Title: {dataset.datasetName}
                 </h2> */}
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                 Summary
               </h4>
               <h4 style={{ marginTop: "0px" }}>{dataset.description}</h4>

               {/* <h3 style={{ fontWeight: "bold" }}>
                   {" "}
                   Summary: {dataset.description}
                 </h3> */}
               <div className={classes.Chips}>
                 <h4 style={{ marginTop: "0px" }}>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     ExperimentType
                   </h4>

                   {/* {experimentTypes &&
                       experimentTypes.map(experiment => (
                         <>
                           {Object.keys(experiment.experimentType).map(key2 => (
                             <div>{experiment.experimentType[key2]}</div>
                           ))}
                           <div>{experiment.description}</div>
                         </>
                       ))} */}
                   {experimentTypes &&
                     experimentTypes.map((row, index) => {
                       const ret = `${row["experimentType"]["name"]}`;
                       return (
                         <Chip
                           size="medium"
                           variant="outlined"
                           label={ret}
                           onClick={handleClick}
                           color="primary"
                         />
                       );
                     })}
                 </h4>
               </div>
               <div>
                 <h4 style={{ marginTop: "0px" }}>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Keywords
                   </h4>

                   {keywords &&
                     keywords.map((row, index) => {
                       const ret = `${row["name"]} `;
                       return (
                         <Chip
                           size="medium"
                           variant="outlined"
                           label={ret}
                           onClick={handleClick}
                           color="primary"
                         />
                       );
                     })}
                 </h4>
               </div>
               <div>
                 {/* <h3>{JSON.stringify(  dataset.fundingSources)}</h3> */}
                 <h4 style={{ marginTop: "0px" }}>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     FundingSource
                   </h4>

                   {/* {fundingSources &&
                       fundingSources.map(funding => (
                         <>
                           {Object.keys(funding.fundingSource).map(key3 => (
                             <div>{funding.fundingSource[key3]}</div>
                           ))}
                           <div>{funding.grantNumber}</div>
                         </>
                       ))} */}

                   {fundingSources &&
                     fundingSources.map((row, index) => {
                       const ret = `${row["fundingSource"]["name"]} `;
                       return (
                         <Chip
                           size="medium"
                           variant="outlined"
                           label={ret}
                           onClick={handleClick}
                           color="primary"
                         />
                       );
                     })}
                 </h4>
               </div>
             </div>
           </Card>

           <div className={classes.align}>
             <Card className={classes.bullet2}>
               <div>
                 <h3 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                   Sample
                 </h3>
               </div>
               <Divider />
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Name</h4>
               <h4 style={{ marginTop: "0px" }}>{sample.name}</h4>
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                 Description
               </h4>
               <h4 style={{ marginTop: "0px" }}>{sample.description}</h4>
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>URL</h4>
               <h4 style={{ marginTop: "0px" }}>{sample.url}</h4>
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                 Sample Descriptors
               </h4>
               {sampleDescriptors &&
                 sampleDescriptors.map((row, index) => {
                   const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} `;
                   return (
                     <Chip
                       size="medium"
                       variant="outlined"
                       label={ret}
                       color="primary"
                     />
                   );
                 })}
             </Card>
           </div>

           <Card className={classes.bullet1}>
             <div>
               <h4 style={{ marginTop: "0px" }}>
                 <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                   Publications
                 </h4>
                 <Divider />
                 {/* <h3>{JSON.stringify(  dataset.papers)}</h3> */}
                 {papers &&
                   papers.map(paper => (
                     <h5 style={{ marginTop: "0px" }}>
                      <ul> 
                      <li>{paper.title}
                       {paper.authorList}
                       {paper.journalName}
                       {paper.pmid}</li>
                       {paper.url}</ul>
                     </h5>
                   ))}
               </h4>
             </div>
           </Card>

           <div className={classes.align1}>
             <Card className={classes.bullet2}>
               <div>
                 {/* style={{ display: "flex", justifyContent: "space-between" }} */}

                 <h3 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                   Provider
                 </h3>
               </div>
               <Divider />
               <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Name</h4>
               <h4 style={{ marginTop: "0px" }}>{provider.name}</h4>
               {provider.providerGroup && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Group
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>
                     {provider.providerGroup}
                   </h4>
                 </div>
               )}
               {provider.department && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Department
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.department}</h4>
                 </div>
               )}
               {provider.affiliation && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Affiliation
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.affiliation}</h4>
                 </div>
               )}
               {provider.url && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     URL
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.url}</h4>
                 </div>
               )}
               {provider.contact && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Contact
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.contact}</h4>
                 </div>
               )}
               {provider.username && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Username
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.username}</h4>
                 </div>
               )}
               {provider.email && (
                 <div>
                   <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                     Email
                   </h4>
                   <h4 style={{ marginTop: "0px" }}>{provider.email}</h4>
                 </div>
               )}
             </Card>
           </div>

           <Card className={classes.bullet1}>
             <h3 style={{ color: "#5bc0be", marginBottom: "0px" }}>
               DataFiles
               <Divider/>
               <Table
                 className={classes.bullet2}
                 aria-label="simple table"
                 borderColor="#5bc0be"
                 borderStyle="solid"
               >
                 <TableHead>
                   {dataFiles &&
                     dataFiles.map(data => (
                       <>
                         <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                           <TableCell> original_file_name</TableCell>
                           <TableCell>Description</TableCell>
                           <TableCell>data_file_size</TableCell>
                           <TableCell>
                             <Button
                               style={{ color: "#5bc0be", marginBottom: "0px" }}
                             >
                               Download
                             </Button>
                           </TableCell>

                           <TableRow>{data.origFileId}</TableRow>
                           <TableRow>{data.description}</TableRow>
                           <TableRow>{data.data_file_size}</TableRow>

                         </h4>
                       </>
                     ))}
                 </TableHead>
               </Table>
              
             </h3>
           </Card>
         </div>
       </div>
     );
   };


export default DatasetDetails;



{
  /* <TableHead>
                 <h3>{JSON.stringify(dataset.dataFiles)}</h3>

                 <TableRow>
                   <TableCell> dataFileId</TableCell>
                   <TableCell>original_file_name</TableCell>
                   <TableCell>description</TableCell>
                   <TableCell>data_file_size</TableCell>
                   <TableCell>
                     <Button style={{ color: "#5bc0be", marginBottom: "0px" }}>
                       Download
                     </Button>
                   </TableCell>
                 </TableRow>
               </TableHead> */
}