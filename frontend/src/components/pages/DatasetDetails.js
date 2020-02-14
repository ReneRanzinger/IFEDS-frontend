import React, { useState, useEffect } from "react";
//import PropTypes from 'prop-types';
//import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
//import Navbar from './Navbar.js';
//import Sidebar from './Sidebar.js';
//import Header from './Header';
//import Content from './Content';
//import Background from './Background';
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import MenuAppBar from "./MenuAppBar";
//import datasetDetail from '../../datasetDetail.json';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
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
  }
});


 
   const DatasetDetails = props => {



     const classes = useStyles();
     const [dataset, setDataset] = useState([]);
     const [sample, setSample] = useState([]);
     const [sampleDescriptors, setSampleDescriptors] = useState([]);
     const [experimentTypes, setExperimentTypes] = useState([]);
     const [papers, setPapers] = useState([]);
     const [keywords, setKeywords] = useState([]);
     const [fundingSources, setFundingSources] = useState([]);
     const [dataFiles, setDataFiles] = useState([]);
     const [error, setError] = useState(null);
     const isAuthenticated = useSelector(state => state.user.token);

     // sample:[],
     // sampleDescriptors:[],
     // experimentTypes: [],
     // papers: [],
     // keywords:[],
     // fundingSources: [],
     // dataFiles:[],
     // error: null

     useEffect(() => {
       const {
         match: { params }
       } = props;
       console.log(params);
       fetch(`http://localhost:8080/dataset/${params.id}`,
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
           <div>
             <Card className={classes.bullet}>
               <CardContent>
                 <div
                   style={{ display: "flex", justifyContent: "space-between" }}
                 >
                   <h2 style={{ color: "Purple" }} className={classes.title}>
                     Title: {dataset.datasetName}
                   </h2>
                 </div>
                 <h3 style={{ fontWeight: "bold" }}>
                   {" "}
                   Summary: {dataset.description}
                 </h3>
                 <div>
                   <h3>
                     <h3 style={{ color: "blue" }}> ExperimentType </h3>

                     {experimentTypes &&
                       experimentTypes.map(experiment => (
                         <>
                           {Object.keys(experiment.experimentType).map(key2 => (
                             <div>{experiment.experimentType[key2]}</div>
                           ))}
                           <div>{experiment.description}</div>
                         </>
                       ))}
                   </h3>
                 </div>
                 <div>
                   <h3 style={{ color: "blue" }}> Keywords </h3>
                   {/* <h3>{JSON.stringify(  dataset.keywords)}</h3> */}
                   <h3>
                     {keywords &&
                       keywords.map(keyword => (
                         <h4>
                           {keyword.keywordId}
                           <br />
                           {keyword.name}
                           <br />
                           {keyword.description}
                           <br />
                           {keyword.url}
                         </h4>
                       ))}
                     {/* {console.log(  papers)} */}
                   </h3>
                 </div>
                 <div>
                   {/* <h3>{JSON.stringify(  dataset.fundingSources)}</h3> */}
                   <h3 style={{ color: "blue" }}> FundingSource </h3>

                   <h3>
                     {fundingSources &&
                       fundingSources.map(funding => (
                         <>
                           {Object.keys(funding.fundingSource).map(key3 => (
                             <div>{funding.fundingSource[key3]}</div>
                           ))}
                           <div>{funding.grantNumber}</div>
                         </>
                       ))}
                   </h3>
                 </div>
               </CardContent>
             </Card>
           </div>
           <Card className={classes.bullet}>
             <div>
               <h3 style={{ color: "blue" }}> Publications </h3>
               {/* <h3>{JSON.stringify(  dataset.papers)}</h3> */}
               <h3>
                 {papers &&
                   papers.map(paper => (
                     <h4>
                       {paper.paperId}
                       <br />
                       {paper.title}
                       <br />
                       {paper.authorList}
                       <br />
                       {paper.journalName}
                       <br />
                       {paper.pmid}
                       <br />
                       {paper.url}
                     </h4>
                   ))}
                 {/* {console.log(  papers)} */}
               </h3>
             </div>
           </Card>
           <Card className={classes.bullet}>
             <div>
               {/* <h3>{JSON.stringify(  dataset.dataFiles)}</h3> */}
               <h3 style={{ color: "blue" }}> DataFiles </h3>

               {dataFiles &&
                 dataFiles.map(data => (
                   <>
                     {Object.keys(data.dataType).map(key3 => (
                       <div>{data.dataType[key3]}</div>
                     ))}
                     <div>{data.origFileId}</div>
                     <div>{data.description}</div>
                   </>
                 ))}
             </div>
           </Card>
           <Card className={classes.bullet}>
             <div>
               <h3>
                 <h3 style={{ color: "blue" }}> Provider </h3>
                 Name:
                 {JSON.stringify(dataset.provider && dataset.provider.name)}
                 <br />
                 providerGroup:
                 {JSON.stringify(
                   dataset.provider && dataset.provider.providerGroup
                 )}
                 <br />
                 Department:
                 {JSON.stringify(
                   dataset.provider && dataset.provider.department
                 )}
                 <br />
                 Affiliation:
                 {JSON.stringify(
                   dataset.provider && dataset.provider.affiliation
                 )}
                 <br />
                 URL:
                 {JSON.stringify(dataset.provider && dataset.provider.url)}
                 <br />
                 Contact:
                 {JSON.stringify(dataset.provider && dataset.provider.contact)}
                 <br />
                 {/* UserName:
              {JSON.stringify(
                  dataset.provider &&
                    dataset.provider.username
              )} */}
                 <br />
                 Email:
                 {JSON.stringify(dataset.provider && dataset.provider.email)}
               </h3>
             </div>
           </Card>

           {/* <h3>
              {JSON.stringify(
                  dataset.experimentTypes &&
                    dataset.experimentTypes.experimentType
              )}
            </h3> */}
           {/* <Card className={classes.bullet}>
             <div>
               <h3 style={{ color: "blue" }}> Sample </h3>
               <h3>
                 Summary:{" "}
                 {JSON.stringify(dataset.sample && dataset.sample.name)}
               </h3>
               <h3>
                 <div>{sample.sampleId}</div>
                 <div>{sample.name}</div>
                 <div>{sample.description}</div>
                 <div>{sample.url}</div>
               </h3>
             </div>
             </Card> */}
             <div>
               <Card className={classes.bullet}>
                 <div
                   style={{ display: "flex", justifyContent: "space-between" }}
                 >
                   <h3 style={{ color: "green" }}>Sample</h3>
                  
                 </div>
                 <Divider />
                 <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>Name</h4>
                 <h4 style={{ marginTop: "0px" }}>{sample.name}</h4>
                 <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                   Description
                 </h4>
                 <h4 style={{ marginTop: "0px" }}>
                   {sample.description}
                 </h4>
                 <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>URL</h4>
                 <h4 style={{ marginTop: "0px" }}>{sample.url}</h4>
                 <h4 style={{ color: "#5bc0be", marginBottom: "0px" }}>
                   Sample Descriptors
                 </h4>
                 {sampleDescriptors &&
                   sampleDescriptors.map((row, index) => {
                     const ret = `${row["sampleDescriptor"]["name"]} :\xa0\xa0 ${row["value"]} \xa0\xa0  ${row["unitOfMeasurement"]}`;
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
               
               <Card className={classes.bullet1}>
                 <div
                   style={{ display: "flex", justifyContent: "space-between" }}
                 >
                   
                 </div>
               </Card>
               {/* <div>
                 <h3>
                   <h3 style={{ color: "blue" }}>SampleDescriptor</h3>

                   {sampleDescriptors &&
                     sampleDescriptors.map(sampleDesc => (
                       <>
                         {Object.keys(sampleDesc.sampleDescriptor).map(key => (
                           <div>{sampleDesc.sampleDescriptor[key]}</div>
                         ))}
                         <div>{sampleDesc.value}</div>
                         <div>{sampleDesc.unitOfMeasurement}</div>
                       </>
                     ))}
                 </h3>
               </div> */}
             </div>
           
         </div>
       </div>
     );
   };


export default DatasetDetails;




