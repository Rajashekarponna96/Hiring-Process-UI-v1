import { Component, OnInit, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { UserAccout } from "../model/userAccount";
import { Permission } from "../model/permission";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon', { static: false }) toggleIcon: ElementRef;
  public menuItems: RouteInfo[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  layoutSub: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl = 'assets/img/logo-dark.png';
            } else {
              this.logoUrl = 'assets/img/logo.png';
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          } else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }
        }
      }
    );
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.menuItems = this.generateMenuItems();

    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      this.logoUrl = 'assets/img/logo.png';
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed !== undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        } else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles: string[]) {
    this.activeTitles = titles;
  }

  // Generate menu items based on user permissions
  generateMenuItems(): RouteInfo[] {
    debugger;
    const userJson = localStorage.getItem('userDetails');
    const user: UserAccout = userJson ? JSON.parse(userJson) : { role: { permissions: [] } };
    const permissions: Permission[] = user.role.permissions || [];

    const menuItems: RouteInfo[] = [
      {
        path: '',
        title: 'Dashboard',
        icon: 'ft-home',
        class: 'has-sub',
        badge: '2',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
          { path: '/dashboard/dashboard1', title: 'Dashboard1', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/dashboard/dashboard2', title: 'Dashboard21', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/dashboard/dashboard3', title: 'Dashboard31', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }

        ],
        permissionName: 'home'
      },
      // { path: '/Createtalentpool', title: 'Createtalentpool', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], permissionName: 'job' },

      // { path: '/Listtalentpool', title: 'Task Board NgRx', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], permissionName: 'job' },

      // { path: '/player', title: 'Player', icon: 'ft-music', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], permissionName: 'candidate1' }
      //
      , {
        path: '',
        title: 'Talentpool',
        icon: 'ft-home',
        class: 'has-sub',
        badge: '2',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
          { path: '/talentpool/Createtalentpool', title: 'Createtalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/talentpool/Listtalentpool', title: 'Listtalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/talentpool/Edittalentpool', title: 'Edittalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }

        ],
        permissionName: 'home'
      },
      //job

      {
        path: '',
        title: 'Job1',
        icon: 'ft-home',
        class: 'has-sub',
        badge: '2',
        badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1',
        isExternalLink: false,
        submenu: [
          { path: '/job/Createjob', title: 'Createtalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/job/Listjob', title: 'Listtalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
          { path: '/job/Editjob', title: 'Edittalentpool', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

        ],
        permissionName: 'client'
      },//job end
    ];

    return menuItems.filter(menuItem => this.isPermissionsEnable(menuItem.permissionName, permissions));
  }

  // Check if permission is enabled
  isPermissionsEnable(permissionName: string | undefined, permissions: Permission[]): boolean {
    if (!permissionName) {
      return false;
    }

    return permissions.some(permission => permission.name.toLowerCase() === permissionName.toLowerCase());
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1) {
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
    }
  }
}

