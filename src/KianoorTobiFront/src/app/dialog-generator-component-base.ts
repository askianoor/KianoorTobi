import { Directive, EventEmitter, Injector, Input, OnDestroy, Output } from "@angular/core";
import { NgbActiveModal, NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ComponentType } from '@angular/cdk/portal';
import { Subscription } from "rxjs";

@Directive({})
export abstract class DialogGeneratorComponentBase<T> implements OnDestroy {
  public dialog: NgbModal;
  public data: any;

  constructor(injector: Injector) {
    this.dialog = injector.get(NgbModal);
  }

  abstract dialogComponent: ComponentType<T>;
  abstract dialogConfigs: any;
  isEditMode = false;
  afterCloseSub!: Subscription;
  afterOpenSub!: Subscription;
  @Output() public onAfterSave = new EventEmitter<any>();
  @Input() isEditBeforeSave = false;

  openDialog(data: T): void {
    setTimeout(() => {
        this.dialogConfigs['data'] = data;
        const dialogOpened = this.dialog.open(this.dialogComponent, this.dialogConfigs);
        this.afterOpen(dialogOpened.componentInstance);
    });
  };

  closeDialog(): void {
    this.dialog.dismissAll();
  }

  ngOnDestroy(): void {
    if (this.afterCloseSub) {
      this.afterCloseSub.unsubscribe();
    }
    if (this.afterOpenSub) {
      this.afterOpenSub.unsubscribe();
    }
  }

  afterOpen(dialogRef: any): void {
    dialogRef['isEditBeforeSave'] = this.isEditBeforeSave;
    dialogRef['isEditMode'] = this.isEditMode;
    if (this.afterCloseSub) {
      this.afterCloseSub.unsubscribe();
    }
    this.afterCloseSub = dialogRef.dialogRef.afterClosed().subscribe((result: any) => {
      this.onAfterSave.emit(result);
      this.afterCloseSub.unsubscribe();
    });
  }
}
