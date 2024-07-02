import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrl: './collapsible-container.component.scss'
})
export class CollapsibleContainerComponent implements OnInit{
  @Input() initialValue: boolean = false;
  @Input() title: string = '';

  isCollapsed = false;

  ngOnInit() {
    this.isCollapsed = this.initialValue;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
