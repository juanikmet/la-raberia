const LogoCover = ({greeting}) => {
    return(
        
        <div className="flex items-center justify-center h-screen bg-customOrangeLight">
            <div className="flex flex-col items-center justify-center" >
                <h1 className="text-center text-8xl text-white font-custom">{greeting}</h1>
            </div>
        </div>
    )
};

export default LogoCover;