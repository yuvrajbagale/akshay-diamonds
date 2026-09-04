import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { MobileBottomNav } from './layout/mobile-bottom-nav/mobile-bottom-nav';
import { MobileMenu } from './layout/mobile-menu/mobile-menu';
import { SearchOverlay } from './layout/search-overlay/search-overlay';
import { UiToaster } from './shared/ui/toaster/ui-toaster';
import { CookieConsent } from './layout/cookie-consent/cookie-consent';

/**
 * Application shell: skip link, sticky header, routed content, footer and
 * the fixed overlays (mobile menu, search, toasts, cookie consent) rendered once.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MobileMenu, MobileBottomNav, SearchOverlay, UiToaster, CookieConsent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
