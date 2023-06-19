// /* eslint-disable */ 
// import axios from 'axios'
import  {useState,useEffect} from 'react'
import {
  Card ,
  CardMedia,
  Box,
  Typography,
  Grid,
  Stack,
  CardContent,
  CardHeader,
  Pagination as PaginatonMUI,
  PaginationItem,
  
} from '@mui/material'
import {ArrowBackIos,ArrowForwardIos} from '@mui/icons-material'
import { makeStyles } from '@mui/styles';


const useStyles=makeStyles((theme)=>({
  paginationBox:{
    marginTop:"10px",
    justifyContent:"center",
     alignItems:"center",
     textAlign:"center",
    //  border:"1px solid green",

  },
  spanFonts:{
    // marginLeft:'20px',
    border:"1px solid ",
    cursor:"pointer",
    padding:5,
    fontSize:'20px',
    width:20
  },
activeSpan:{
  border:"1px solid black ",
    cursor:"pointer",
    fontSize:'20px',
    width:20,
    padding:5,
    background:'gray',
    color:"#ffff"
},
 arrowForworddisable:{
  // cursor:'pointer',
  // marginLeft:10
  display:"none"
 } ,
 arrowBackdisable:{
display:"none"


 },
 arrowbackStyles:{
  cursor:'pointer',
  marginLeft:10
 },
 forwordarrowStyles:{
  cursor:'pointer',
  marginLeft:10
 },
 cardHeader:{
  backgroundColor: 'black',
  color: 'white',
  textShadow:'1px 1px 1px #ffb3ff'
 }
}));
const Pagination = () => {
  const classes= useStyles();
const [products,setProducts]=useState([])
const [currentpage,setCurrentPage]=useState(1)
const [postesPerPage]=useState(6)


const indexOfLastPage=currentpage*postesPerPage  
const indexOfFirstPage=indexOfLastPage-postesPerPage
const currentPosts=products.slice(indexOfFirstPage,indexOfFirstPage)
const fetchData=async()=>{
    const res = await fetch('https://dummyjson.com/products')
    const data = await res.json()
     if(data && data.products ){
      console.log("data",data.products)
      setProducts(data.products);
     }
};
console.log("products",products)

useEffect(()=>{
  
fetchData();
},[])

const handleClick = (pageNumber) => {
  if(pageNumber >=1 && pageNumber <= products.length /6 && pageNumber!==currentpage ){
  setCurrentPage(pageNumber);
  }
};



  return (
    
 
<Box style={{alignItems:"center",justifyContent:"center",textAlign:"center"}}>
  <h1> Our Products</h1>
  { currentPosts && products.length >0 && <>
  <Grid container spacing={2} flexDirection='row' style={{margin:'auto'}} >
  {products.slice(indexOfFirstPage,indexOfLastPage).map((prod)=>(
    <Grid item >
    <Card  variant='outlined' sx={{maxWidth:345,margin:"auto"}}>
      <CardHeader title={prod.title} className={classes.cardHeader} />
      <CardMedia
       component='img'
       height="194"
       sx={{
        // width:'140'
       }}
      image={prod.thumbnail}
      alt={prod.title} />
      <CardContent>
        <sapn>Brand:{prod.brand}</sapn>
        <span style={{marginLeft:'5px'}}>Price:{prod.price}</span>
          
        <span style={{marginLeft:'5px'}}>Rating:{prod.rating}</span>
        <span style={{marginLeft:'5px'}}>Stock:{prod.stock}</span>

      </CardContent>
    </Card>
    </Grid>
  ))}
  </Grid>
  </>}

{products.length >0 && <Box className={classes.paginationBox} >
 <span className={currentpage>1 ? classes.arrowbackStyles: classes.arrowBackdisable}   onClick={()=>handleClick(currentpage-1)}><ArrowBackIos  fontSize='small'/></span>
  {[...Array(products.length/6)].map((_,i)=>
  
 <span  className={currentpage === i+1 ? classes.activeSpan :classes.spanFonts}  onClick={()=>handleClick(i+1)}>{i+1}</span>
  )
  }
 <span className={currentpage< products.length /6 ? classes.forwordarrowStyles :classes.arrowForworddisable}  onClick={()=>handleClick(currentpage+1)}><ArrowForwardIos     fontSize='small'/></span>
  </Box>}

</Box>
  )
}

export default Pagination
