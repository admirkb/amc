// angular

import {Component, ElementRef, EventEmitter, Output} from '@angular/core';


@Component({
    selector: 'ad-media-upload',
    template: `

                    
                    <div id="divHost" >

<div style="color:red;"></div>
    <div id="angularFileDisplayArea" [innerHTML]="angularFileDisplayArea" style="display:; width:250;height:0px;background:yellow; display:none;"></div>


    <table style="width:100%;background-color:red;">
        <tr>
            <td style="width:100%; white-space:nowrap;">
                <div style="width:100%; text-align:right; background-color:transparent; color:wheat">Select your image:
                </div>
            </td>
            <td>
    <span class="btn btn-default btn-file btn-primary" style="background-color:#D00A00;">
    Browse <input type="file"  (change)="onChange($event)" >
</span>

        </tr>
    </table>



</div>

    `,
})
export class ADMediaUpload {
    private _element: any;
    private angularFileDisplayArea: any;

    private image: any;
    private imageAsData: any;
    @Output() ImageChangedEvent: EventEmitter<any> = new EventEmitter();

    constructor(elementRef: ElementRef) {

        this._element = elementRef.nativeElement;

        this.angularFileDisplayArea = ""

        this.ImageChangedEvent.subscribe((args) => {



            console.log("ImageChangedEvent fired")
            console.dir(args)



        });
    }

    clicked() {
        console.log("clicked...")
    }


    onChange(event) {
        var files = event.srcElement.files;
        console.log(files);


        var displayArea = null;
        var searchForDisplayArea = null;


        var file = files[0];
        var imageType = /image.*/;

        var self = this;

        if (file.type.match(imageType)) {
            var reader = new FileReader();

            reader.onload = function (e) {


                var img = new Image();
                img.width = 0;
                img.height = 0;

                img.src = reader.result;

                var imageSrc = img.src;
                var newTargetWidth = 160;
                var newTargetHeight = 90;


                var resizedImage = imageResize(imageSrc, newTargetWidth, newTargetHeight);


                try {

                    this.imageAsData = reader.result;
                    this.imageAsData = resizedImage.dataURLArray[0].dataURL;

                    var theImage = "<img src='" + this.imageAsData + "'></img>";



                    // Update ui
                    self.angularFileDisplayArea = theImage;
                    // Inform of new image data;
                    var o = new Object();
                    o.time = new Date();
                    o.imageAsData = this.imageAsData;
                    self.ImageChangedEvent.emit(o)

                }
                catch (e) {
                    console.log("Storage failed: " + e);
                }

            }

            reader.readAsDataURL(file);
        } else {
            this.angularFileDisplayArea = "File not supported!";
        }



        function imageResize(img, width, height) {


            var imageSrc = img;
            var newTargetWidth = width;
            var newTargetHeight = height;

            var cols = 1;
            var rows = 1;


            var dataURLArray = [];
            //var o = new Object();
            //o.id = id;

            var canvas0 = document.createElement('canvas');
            canvas0.width = newTargetWidth;
            canvas0.height = newTargetHeight;
            canvas0.id = "Canvas0" + 0;

            var context0 = canvas0.getContext('2d');
            var URLImages = new Object();

            var imageObj = new Image();
            imageObj.onload = function () {


            };
            imageObj.src = imageSrc;

            URLImages.sourceX = newTargetWidth;
            URLImages.sourceY = newTargetHeight;
            URLImages.sourceWidth = newTargetWidth;
            URLImages.sourceHeight = newTargetHeight;
            URLImages.destWidth = newTargetWidth;
            URLImages.destHeight = newTargetHeight;
            URLImages.destX = 0
            URLImages.destY = 0
            URLImages.dataURLArray = [];


            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {


                    context0.drawImage(imageObj, 0, 0, newTargetWidth, newTargetHeight);

                    var o = new Object();
                    o.dataURL = canvas0.toDataURL();
                    o.i = i;
                    o.j = j;

                    URLImages.dataURLArray.push(o);
                }
            }

            return URLImages;

        }

    }

}

