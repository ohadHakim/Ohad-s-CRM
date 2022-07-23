import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() headerLabel?: string;
  @Input() buttonLabel = 'close';
  @Input() showNotification = false;

  @Output() buttonClicked = new EventEmitter<boolean>();

  onButtonClicked() {
    this.buttonClicked.emit(false);
  }
  constructor() {}

  ngOnInit(): void {}
}
