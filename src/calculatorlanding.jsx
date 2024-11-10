import Calculator from "./components/calculator";
import './calculatorlanding.css';

const Calculatorlanding = () =>{
    
    return(
        <div className="calculator-landing">
            <div className="calculator-container">
            <Calculator/>
            </div>
            <div className="app-details">
                <div className="app-title">
                    <h1 className="heading">Calculator</h1>
                </div>
                <div className="color-schema-container">
                    <h3 className="app-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, placeat.</h3>
                </div>
            </div>
        </div>
    )
}

export default Calculatorlanding;