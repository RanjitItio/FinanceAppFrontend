import 'bootstrap/dist/css/bootstrap.min.css'



function Container(props) {
    return(
        <div className='container-fluid' style={{ position: 'absolute', zIndex: '1', top: '18rem'}}>
                {props.children}
        </div>
    )
}



export default Container;
