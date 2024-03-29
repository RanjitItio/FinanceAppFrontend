import 'bootstrap/dist/css/bootstrap.min.css'



function Container(props) {
    return(
        <div className='container-fluid'>
                {props.children}
        </div>
    )
}


export default Container;

// style={{zIndex: "1", position: "absolute",top: "19rem", left: "5rem" }}