import { FC } from "react";
import Head from "next/head";
import { Box } from "@mui/material";

import { Navbar, Sidebar } from "../ui";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout:FC<Props> = ({title = 'OpenJira', children}) => {
  return ( 
    <Box width="100%">
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <Sidebar />

      <Box padding="10px 20px">
        {children}
      </Box>
    </Box>
   );
}