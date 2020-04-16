// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DescriptionIcon from "@material-ui/icons/Description";
// core components/views for Admin layout
import DashBoardXV2 from "./views/Dashboard/DashBoardXV2";
import UserProfile from "./views/UserProfile/UserProfile";
import TableList from "./views/TableList/TableList";
import Typography from "./views/Typography/Typography";
import Icons from "./views/Icons/Icons";
import Maps from "./views/Maps/Maps";
import NotificationsPage from "./views/Notifications/Notifications";
import { PostsPage } from "./views/posts/postPage";
// core components/views for RTL layout
import RTLPage from "./views/RTLPage/RTLPage";
import LoginX from "./components/LoginX/LoginX";
//'./components/login/login';
const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin",
  // },
  {
    path: "/dashboardx",
    name: "DashboardXV2",
    rtlName: "לוח בקרה",
    icon: Dashboard,
    component: DashBoardXV2,
    layout: "/adminx",
  },
  {
    path: "/posts",
    name: "Posts",
    rtlName: "פרסומים",
    icon: DescriptionIcon,
    component: PostsPage,
    layout: "/adminx",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "פרופיל משתמש",
    icon: Person,
    component: UserProfile,
    layout: "/adminx",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "טבלאות",
    icon: "content_paste",
    component: TableList,
    layout: "/adminx",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "כתב ופונטים",
    icon: LibraryBooks,
    component: Typography,
    layout: "/adminx",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "סמלים",
    icon: BubbleChart,
    component: Icons,
    layout: "/adminx",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "מפות",
    icon: LocationOn,
    component: Maps,
    layout: "/adminx",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "התראות",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/adminx",
  },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    path: "/loginx",
    name: "LoginX",
    rtlName: "התחברות",
    icon: AccountCircleIcon,
    component: LoginX,
    layout: "/adminx",
  },
];

export default dashboardRoutes;
