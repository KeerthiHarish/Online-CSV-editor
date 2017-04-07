import Ember from 'ember';


export default Ember.Controller.extend({
  newFile: [],
  displayDownload: false,
  fileUploaded: false,
  actions: {
    savevalue: function(outerIndex, innerIndex, value) {
      this.set('displayDownload', true);
      let contents = this.get('values');
      let row = contents[outerIndex];
      row[innerIndex] = value;
    },

    downloadfile: function() {
      var data = this.get('values');
      var csvContent = "data:text/csv;charset=utf-8,";
      data.map((infoArray, index) => {
        if(infoArray) {
           let dataString = infoArray.join(",");
           csvContent += index < data.length ? dataString+ "\n" : dataString;
        }
      });
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "your_filename.csv");
      document.body.appendChild(link); // Required for FF

      link.click();
    }
  }
});
