import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { buffer, filter, map, pluck } from 'rxjs/operators';

const isActivationEnd = (e: any) => e instanceof ActivationEnd;
const isNavigationEnd = (e: any) => e instanceof NavigationEnd;

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _bcData: { label: string; url: string }[] = [];

  constructor(private router: Router) {
    const navigationEnd$ = this.router.events.pipe(filter(isNavigationEnd));
    this.router.events
      .pipe(
        filter(isActivationEnd),
        pluck('snapshot', 'data', 'breadcrum'),
        buffer(navigationEnd$),
        map((bcData: string[]) =>
          bcData
            .filter((data) => !!data)
            .reverse()
            .map((bcString, index, bcStrings) => {
              return {
                label: bcString,
                url: bcStrings
                  .slice(0, index + 1)
                  .reduce((a, i) => a + '/' + i, ''),
              };
            })
        )
      )
      .subscribe((data) => (this._bcData = data));
  }

  get bcData() {
    return this._bcData;
  }
}
