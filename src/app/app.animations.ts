import { trigger, transition, query, style, animateChild, group, animate } from '@angular/animations';

export const fadeIn =
  trigger('routeAnimations', [
    transition('SocialComponent <=> ConsoleComponent', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 })),
      query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 })),
      query(':leave', animate(200, style({ opacity: 0 }))),
      query(':enter', animate(200, style({ opacity: 1 })))
    ]),
  ]);
