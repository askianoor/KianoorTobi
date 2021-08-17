import {NgxLoadingXConfig, POSITION, SPINNER} from 'ngx-loading-x';

export class AppConsts {

  static readonly ngxLoadingXConfig: NgxLoadingXConfig = {
    show: false,
    bgBlur: 2,
    bgOpacity: 5,
    bgLogoUrlPosition: POSITION.topLeft,
    bgLogoUrlSize: 100,
    spinnerType: SPINNER.threeStrings,
    spinnerSize: 120,
    spinnerColor: '#dd0031',
    spinnerPosition: POSITION.centerCenter,
    bgColor: '#EEEEEE'
  };

}
