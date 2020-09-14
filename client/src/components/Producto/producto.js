import React,{useState, useEffect } from "react";
import "./producto.css";
import { Carousel, CarouselItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,Button,IconButton,AddShoppingCartIcon,Container,Typography } from '@material-ui/core/';
import store from '../../redux/store/index';
import { getProducts } from '../../redux/actions/producto.js'
import { useDispatch } from "react-redux";
import AgregarAlCarrito from '../Carrito/AgregarAlCarrito'


import Reviews from './reviews'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


function Producto(props) {
  const dispatch = useDispatch();
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState({
    imagenes: []
  })
  const classes = useStyles();
  const id = document.URL.split("/").pop()


  const buyButton = () => {
    if (producto.stock > 1) {
      return <Button size="small" color="primary">
        Comprar
     </Button>
    }
    else {
      return <> <p style={{ color: "red" }}>NO HAY STOCK!</p>
      </>
    }
  }

  useEffect(() => {
    dispatch(getProducts(id));

    store.subscribe(() => setProducto(() => store.getState().productos.data.producto))


  }, []);


  const onChange = (event) => {
    event.preventDefault();
    setPrecio(event.target.value * producto.price);
    setCantidad(cantidad + 1)
  };

  return (
    <Container>
      <h1 className = "producto_title">{producto.name}</h1>  
      <hr/>
      < div className="producto_product" >              
        <Card className={classes.root}>
          <CardContent>
            <Carousel>
              {producto.imagenes.map((img, id) =>
                <Carousel.Item key={id}>
                  <img key={id} src={`http://localhost:3001/${img}`} ></img>
                </Carousel.Item>
              )}
            </Carousel>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {producto.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {producto.description}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Cantidad
            <input type="number" onChange={(e) => onChange(e)} />
              </Typography>
              <hr />
              <Typography variant="body2" color="textSecondary" component="p">
                Precio = $
            <span>{precio}</span>
              </Typography>
            </CardContent>
          </CardContent>
          <CardActions>
            {buyButton()}
            <AgregarAlCarrito producto={producto} precio={precio} cantidad={cantidad} />
          </CardActions>
        </Card>
        <Reviews/>
      </div >
    </Container>

  );
}

export default Producto;