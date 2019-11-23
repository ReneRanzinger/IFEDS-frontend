import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import MaterialTable from 'material-table';
import ReadMoreAndLess from 'react-read-more-less';
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";


const useFetch = (url,isDeleted,props) => {
  const isAuthenticated = useSelector(state => state.user.token);

  const [data, setData] = useState([
  {"datasetId":1,"datasetName":"Stem Cell Data 1","sampleName":"Differenciated smooth cell","providerName":"CCRC tr","description":"Glycomics analysis performed with the stem cell data set 1."},
  {"datasetId":2,"datasetName":"Stem Cell Data 2","sampleName":"Differenciated smooth muscle cell","providerName":"CCRC ry","description":"Glycomics analysis performed with the stem cell data set 2."}
  ]);

  useEffect( () => {
    fetch( url,
          {
            method: "GET",
            mode: 'cors',
             headers: setAuthorizationHeader(isAuthenticated)
          }
        ).then(response => response.json())
          .then(res => {
            if(res.status === 401) {
              console.log("Pagal")
              props.props.logout();
            } else {
              setData(res);}
}).catch(error => console.log(error));
}, [isAuthenticated, url,isDeleted] );
  return [data,setData];
}

const fetchDelete =(id, isAuthenticated, props) => {
  fetch( `/datasets/${id}`,
          {
            method: "DELETE",
            mode: 'cors',
             headers: setAuthorizationHeader(isAuthenticated)
          }
        )
          .then(response => response.json())
          .then(res => {
            if(res.status === 401){
              props.props.logout();
            }
            console.log(res)

            ;

}).catch(error => {console.log(error)});
}


export default function MaterialTableDemo(props) {
  const isAuthenticated = useSelector(state => state.user.token);
  const isAuthenticated1 = useSelector(state => state.rows);
  const [isDeleted,setDeleted] = useState(false);
  const [data]= useFetch("/getProviderDatasets",isDeleted,props);

  const handleDescription = (description) => {
  return(
    <ReadMoreAndLess className="read-more-content"
                                           charLimit={125}
                                           readMoreText="...read more"
                                           readLessText="...read less">
           {description}
    </ReadMoreAndLess>);
  }

  const headCells = [
    { field:'datasetName',title: 'Dataset Name' },
    { field: 'providerName', title: 'Author' },
    { field: 'sampleName',  title: 'Sample Name' },
    { field: 'description', title: 'Dataset Description', sorting: false, searchable: false, render: rowData =>handleDescription(rowData.description) },
  ];

  const [state, setState] = React.useState({
    columns: headCells,
    data: data
  });

  return (
    <MaterialTable
      title="Dataset Table"
      columns={headCells}
      data={data}
      editable={{

        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {


              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              console.log(isAuthenticated1);
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              fetchDelete(oldData.description, isAuthenticated, props);
              setDeleted(!isDeleted);
          }, 300);
          }),
      }}
    />
  );
}
