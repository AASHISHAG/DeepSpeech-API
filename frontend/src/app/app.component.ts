import { Component , OnInit, Output } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import {AppService} from './app.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    fileToUpload: File = null;
    private record;
    recording = false;
    private url;
    private error;
    response ;
    isloader = false;
    text: string;

    constructor(private domSanitizer: DomSanitizer, private appService: AppService, private spinner: NgxSpinnerService) {
    }

    sanitize(url:string){
        return this.domSanitizer.bypassSecurityTrustUrl(url);
    }

    /**
     * Start recording.
     */
    initiateRecording() {
        
        this.recording = true;
        let mediaConstraints = {
            video: false,
            audio: true
        };
        navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }

    /**
     * Will be called automatically.
     */
    successCallback(stream) {
        var options = {
            mimeType: "audio/wav",
            numberOfAudioChannels: 1
        };
        //Start Actuall Recording
        var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
        this.record = new StereoAudioRecorder(stream, options);
        this.record.record();
    }

    /**
     * Stop recording.
     */
    stopRecording() {
        this.recording = false;
        this.record.stop(this.processRecording.bind(this));
    }

    /**
     * processRecording Do what ever you want with blob
     * @param  {any} blob Blog
     */
    processRecording(blob) {
      this.isloader=true;
      this.spinner.show();
      this.url = URL.createObjectURL(blob);
      console.log(this.url)
      this.response = this.appService.save(blob).subscribe(result => {
        this.response = result;
        console.log('s ',this.response.username);
        this.text = this.response.username;
        this.isloader = false;
        this.spinner.hide();
      });
    }
     
    /**
     * Process Error.
     */
    errorCallback(error) {
        this.error = 'Can not play audio in your browser';
    }

    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
      this.uploadFileToActivity()
  }

  uploadFileToActivity() {
    this.isloader=true;
    this.spinner.show();
    this.appService.postFile(this.fileToUpload).subscribe(result => {
        this.response = result;
        console.log('s ',this.response.username);
        this.text = this.response.username;
        this.isloader = false;
        this.spinner.hide();
      });
  }
}