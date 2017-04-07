// import Ember from 'ember';
import EmberUploader from 'ember-uploader';

// var $ = Ember.$;

export default EmberUploader.FileField.extend({

  filesDidChange (files)  {

      let thisFile = files[0];
      if(thisFile.type == 'text/csv') {
        let reader = new FileReader();

        reader.onload = () => {
          let content = reader.result.split('\n');
          this.set('header', content[0].split(','));
          let values = content.map((value, index)=> index && value ? value.split(','): null)
          this.set('values', values);
          this.set('fileUploaded', true);

        }
        reader.readAsText(thisFile)
      } else {
        this.set('errorMessage', 'Please upload a CSV file.');
      }
  }

});
