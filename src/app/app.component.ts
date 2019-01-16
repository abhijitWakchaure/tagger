import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tagger";
  currentTag: Tag;
  allTags: Tag[];

  constructor() {
    this.initTag();
    this.allTags = new Array();
  }

  initTag() {
    this.currentTag = {
      text: "",
      color: "",
      bgcolor: ""
    };
  }

  addTag(t: Tag) {
    if (t.text == "") return;
    var c = this.isTagExists(t);
    if (c == -1) this.allTags.push(t);
    this.initTag();
  }

  removeTag(t: Tag) {
    var c = this.isTagExists(t);
    if (c != -1) this.allTags.splice(c, 1);
  }

  isTagExists(t: Tag) {
    for (var i = 0; i < this.allTags.length; i++) {
      if (this.allTags[i].text == t.text) {
        return i;
      }
    }
    return -1;
  }

  handleTab(event) {
    if (this.currentTag.text == "") return;
    this.currentTag.bgcolor = this.calculateBgColor(this.currentTag);
    this.currentTag.color = this.calculateColor(this.currentTag);
    this.addTag(this.currentTag);
    event.preventDefault();
  }

  calculateColor(t: Tag) {
    var c = t.bgcolor;
    c = c.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    // console.log("luma: ", luma);
    if (luma < 150) {
      return "#f1f1f1";
    } else {
      return "#3f3f3f";
    }
  }

  calculateBgColor(t: Tag) {
    var str = Math.random().toString(36).substring(10) + t.text + Math.random().toString(36).substring(1);
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  }
}
