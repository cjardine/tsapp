import {Component, ViewChild} from '@angular/core';
import {AppRoutes} from './app-routing.module';
import {NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('appContainer') appContainer;

  title = 'tsapp';
  isShowingRouteLoadIndicator = false;
  appRoutes = AppRoutes.filter((route) => {
    return route.data?.title !== undefined;
  });

  constructor(private router: Router) {
    let asyncLoadCount = 0;
    router.events.subscribe(
      (event: RouterEvent): void => {

        if (event instanceof RouteConfigLoadStart) {

          asyncLoadCount++;

        } else if (event instanceof RouteConfigLoadEnd) {

          asyncLoadCount--;

        } else if (event instanceof NavigationStart) {

          this.appContainer.nativeElement.scrollTo(0, 0);

        }

        // If there is at least one pending asynchronous config load request,
        // then let's show the loading indicator.
        // --
        // CAUTION: I'm using CSS to include a small delay such that this loading
        // indicator won't be seen by people with sufficiently fast connections.
        this.isShowingRouteLoadIndicator = !!asyncLoadCount;

      }
    );

  }
}
