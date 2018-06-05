import {Resources} from "./Resources.js";

export class ResourceLoader{
    constructor() {
        this.map = new Map(Resources);
        for(let [key,value] of this.map){
            //const image = new Image();
            const image = wx.createImage();
            image.src = value;
            this.map.set(key,image);
        }
    }

    onloaded(callback) {
        let loadedcount = 0;
        for(let value of this.map.values()) {
            value.onload = () => {
                loadedcount++;
                if(loadedcount >= this.map.size){
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        return new ResourceLoader();
    }
}