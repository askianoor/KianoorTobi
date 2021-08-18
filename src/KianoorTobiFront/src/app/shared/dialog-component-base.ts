
import {Directive, InjectionToken, Injector, OnInit, Optional} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ComponentBase } from './component-base';

@Directive({})
export abstract class DialogComponentBase<TOutput, TCreate, TUpdate> extends ComponentBase implements OnInit {

  protected constructor(private injector: Injector) {
    super(injector);
    this.data = injector.get(NgbModalConfig, null); //TODO: Fix Data Sending Problem.
  }

  public data!: any;
  isEditMode = false;
  id!: number;

  abstract itemModel: TOutput;
  abstract itemCreateModel: TCreate;
  abstract itemUpdateModel: TUpdate;

  loading = true;
  saving = false;
  isEditBeforeSave = false;

  protected abstract populateOnAdd(finishedCallback: Function): void;

  protected abstract populateOnEdit(finishedCallback: Function): void;

  protected abstract createNew(finishedCallback: Function): void;

  protected abstract update(finishedCallback: Function): void;

  private finishSave(result: any): void {
    this.saving = false;
    // this.dialogRef.close(result);
  }

  onSave(): void {
    this.saving = true;
    if (this.id) {
      this.update((result: any) => {
        const res = {isNew: false, result};
        this.saving = false;
        this.finishSave(res);
      });
    } else {
      this.createNew((result: any) => {
        const res = {isNew: true, result};
        this.saving = false;
        this.finishSave(res);
      });
    }
  }

  ngOnInit(): void {
    this.id = (this.data ? this.data.id : null);
    if (this.isEditMode || this.id) {
      this.populateOnEdit(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    } else {
      this.populateOnAdd(() => {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    }
  }
}
