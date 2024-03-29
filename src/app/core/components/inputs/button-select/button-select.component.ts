import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { TUI_ARROW } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';
import { ButtonSelectGroup } from './domain/button-select-group.model';
import { ButtonSelectItem } from './domain/button-select-item.model';

@Component({
  selector: 'fin-button-select',
  templateUrl: './button-select.component.html',
  styleUrls: ['./button-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSelectComponent {

  @ViewChild(TuiHostedDropdownComponent) component?: TuiHostedDropdownComponent;

  @Input() label: string;
  @Input() options: ButtonSelectGroup[];
  @Output() itemSelected = new EventEmitter<ButtonSelectItem>();

  readonly selectedItem$ = new BehaviorSubject<ButtonSelectItem>(null);
  readonly isOpen$ = new BehaviorSubject<boolean>(false);
  readonly arrow = TUI_ARROW;

  onClick(item: ButtonSelectItem): void {
    this.selectedItem$.next(item);
    this.itemSelected.emit(item);
    this.isOpen$.next(false);
    this.component?.nativeFocusableElement?.focus();
  }
}
