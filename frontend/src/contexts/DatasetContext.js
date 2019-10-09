import React, { createContext } from 'react';

export const DatasetContext = createContext();

class DatasetContextProvider extends React.Component { // eslint-disable-line react/prefer-stateless-function
 state = {
   isDatasetModified : false
 }

 toggleDataset = () => {
   this.setState({ isDatasetModified : !this.state.isDatasetModified });
 }

  render() {
    return (
      <DatasetContext.Provider value = {{...this.state, toggleDataset : this.toggleDataset}}>
        {this.props.children}
      </DatasetContext.Provider>
    );
  }
}


export default DatasetContextProvider;
