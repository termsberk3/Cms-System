import { Typography } from "@mui/material";
import Cards from "./components/Cards";

export default function Home() {
  return (
    < >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
       <Cards/>
      </div>
    </>
  );
}
