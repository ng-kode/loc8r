import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  pageContent = {
      header: {
          title: "Loc8r",
          strapline: "our story"
      },
      content:
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida ullamcorper neque, at egestas arcu dignissim id. In enim lacus, pretium vel tincidunt et, eleifend vitae nulla. Proin lacinia, nibh ac pellentesque ornare, odio ipsum placerat enim, id lacinia orci nunc eget sapien. Praesent facilisis nisl sed viverra consectetur. Curabitur dictum at neque non convallis. Aliquam sagittis eros ut feugiat porttitor. Etiam interdum id mi ac ultrices. Etiam in sapien non mauris ultrices dapibus. Sed ac auctor velit. Praesent vehicula elit odio, fermentum tempus massa finibus eget.\n
      Mauris pellentesque odio et diam ultricies, vel euismod leo cursus. Donec facilisis dolor elementum, porta risus vel, pellentesque turpis. Cras non ipsum eget nibh pretium ornare vel elementum purus. Curabitur consequat dolor suscipit lorem euismod rutrum. Phasellus sed nunc quis nisl efficitur iaculis ut id ligula. Curabitur faucibus nisi sed ipsum mollis elementum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ac metus turpis. Praesent eu dolor a magna consequat pharetra. Etiam et sem vehicula, ullamcorper sem at, placerat tellus.`
  };

  ngOnInit() {
  }

}
