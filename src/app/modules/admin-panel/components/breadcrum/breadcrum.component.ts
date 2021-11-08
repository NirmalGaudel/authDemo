import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
})
export class BreadcrumComponent implements OnInit {
  menuItems: any[] = [];
  subs: Subscription[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.menuItems = this.createBreadcrumbs(this._activatedRoute.root);
    const sub = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.menuItems = this.createBreadcrumbs(this._activatedRoute.root))
      );
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  get breadcrum() {
    console.log(this.menuItems);
    return this.menuItems
      .map((menuItem: any) => menuItem.label)
      .join(' / ');
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: any[] = []
  ): any {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) return breadcrumbs;

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (routeURL !== '') url += `/${routeURL}`;
      const label = child.snapshot.data['breadcrum'];
      if (label) breadcrumbs.push({ label, url });
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
