import { useContext } from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";

import { UIContext } from "@/context/ui";

const menuItems = [
	{
		text: "Inbox",
		icon: <InboxOutlinedIcon />,
	},
	{
		text: "Starred",
		icon: <MarkEmailReadOutlinedIcon />,
	},
	{
		text: "Send Email",
		icon: <MailOutlinedIcon />,
	},
	{
		text: "Drafts",
		icon: <DraftsOutlinedIcon />,
	},
];

export const Sidebar = () => {
	const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
			<Box width={250}>
				<Box padding="5px 10px">
					<Typography variant="h4">Menu</Typography>

					<List>
						{menuItems.map((item) => (
							<ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</Drawer>
	);
};
