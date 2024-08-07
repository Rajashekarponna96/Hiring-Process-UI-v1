export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    badge: string;
    badgeClass: string;
    isExternalLink: boolean;
    submenu: RouteInfo[];
    permissionName?: string; // Add permissionName to match API response
}


// // Sidebar route metadata
// export interface RouteInfo {
//     path: string;
//     title: string;
//     icon: string;
//     class: string;
//     badge: string;
//     badgeClass: string;
//     isExternalLink: boolean;
//     submenu : RouteInfo[];
// }
