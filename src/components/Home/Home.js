import React from "react";
import {Redirect} from 'react-router-dom'
// import { Card, CardTitle, CardText, CardMedia } from "material-ui/Card";

// import londonMapImage from "../../assets/images/london-map.png";

const HomePage = () => <Redirect to="/map" />
// const HomePage = () => {
//   const style = { maxWidth: 600, marginTop: "2rem" };
//   return (
//     <React.Fragment>
//       <Card style={style}>
//         <CardMedia>
//           <img src={londonMapImage} alt="London Bike Hire" />
//         </CardMedia>
//         <CardTitle title="Cycle Hire London" subtitle="Santander Bikes" />
//         <CardText>
//           Find bicycles to hire around London. <br/> Lorem ipsum dolor sit amet alejo,
//           consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat
//           volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc
//           lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis
//           lacus id, pellentesque lobortis odio.
//         </CardText>
//       </Card>
//       <Card style={style}>
//         <CardTitle title="Card title Two" subtitle="Card Two subtitle" />
//         <CardText>
//           Lorem ipsum two dolor sit amet developer, consectetur adipiscing elit.
//           Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//           Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed
//           pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque
//           lobortis odio.
//         </CardText>
//       </Card>
//     </React.Fragment>
//   );
// };

export default HomePage;
