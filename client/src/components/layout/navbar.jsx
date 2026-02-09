import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  useSidebar
} from "@/components/ui/sidebar";
import { Home, Target, Trophy, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const options = {
  Main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home
    },
    {
      title: "Goals",
      url: "/goals",
      icon: Target
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: Trophy
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User
    },
  ],

  Footer: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings
    }
  ],
  
  Logout: {
    title: "Logout",
    url: "/login",
    icon: LogOut
  }
}

function Navbar() {
  const { state } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="p-4 flex justify-center">
        <Link to="/dashboard">
          {state === "collapsed" ? (

          <img
          src="/logoIcon.png"
          alt="Stellara Icon"
          className={`h-12 w-12 object-contain transition-all duration-300`}
          />

        ) : (

          <img
          src="/logoFull.png"
          alt="Stellara Logo"
          className={`h-20 w-auto object-contain transition-all duration-300`}
          />

        )}
        </Link>
      </SidebarHeader>

        <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {options.Main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {options.Footer.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link to={options.Logout.url}>
                <options.Logout.icon />
                <span>{options.Logout.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Navbar