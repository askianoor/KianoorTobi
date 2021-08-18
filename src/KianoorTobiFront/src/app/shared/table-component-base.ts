import { Directive, Injector, OnInit } from "@angular/core";
import { ComponentBase } from "./component-base";
import { NgxLoadingService } from "./services/ngx-loading.service";

export class PagedResultDto {
  items!: any[];
  totalCount!: number;
}

export class EntityDto {
  id!: number;
}

export class PagedRequestDto {
  skipCount!: number;
  maxResultCount!: number;
}

@Directive({})
export abstract class TableComponentBase<TEntityDto> extends ComponentBase implements OnInit {

  hasPaging = true;
  public abstract headers: any[] = [];

  protected abstract list(finishedCallback: Function): void;
  abstract selectedRow: TEntityDto;

  public pageSize = 10;
  public pageNumber = 1;
  public totalPages = 1;
  public totalItems: number = 0;
  public isTableLoading = true;
  public keyword = '';
  public source: TEntityDto[] = [];
  skipCount = 0;

  // constructor(private loadingService: NgxLoadingService) {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.getData();
  }

  public showPaging(result: PagedResultDto): void {
    if (result && result.totalCount) {
      this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
      this.totalItems = result.totalCount;
    } else {
      this.totalPages = 0;
      this.totalItems = 0;
    }
  }

  public getData(): void {
    if (this.hasPaging) {
      this.skipCount = (this.pageNumber - 1) * this.pageSize;
    }
    this.isTableLoading = true;
    // this.loadingService.setLoading(true);
    try {
      this.list((result: any) => {
        if (result) {
          setTimeout(() => {
            if (this.hasPaging) {
              this.showPaging(result);
              this.source = result.items;
            } else {
              this.source = result;
            }
            this.isTableLoading = false;
            // this.loadingService.setLoading(false);
          }, 500);
        } else {
          this.isTableLoading = false;
          // this.loadingService.setLoading(false);
        }
      });
    } catch (err) {
      this.isTableLoading = false;
      // this.loadingService.setLoading(false);
    }
  }

  onSortChange(sort: string) {
    this.refresh();
  }

  onSearch(search: string): void {
    this.keyword = search;
    this.refresh();
  }

  onPageChange() {
    this.refresh();
  }

}
