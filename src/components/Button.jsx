import { useState } from "react";
import styles from './button.module.css';

const Button=({color, shape, text, handleClick})=>{
    if(shape == 'circle' && color == 'orange'){
        return(
            <div onClick={handleClick} className={styles.orangeCircleButton}>
                <h3 className={styles.buttonText}>{text}</h3>
            </div>
        )
    }
    else if(shape == 'circle' && color == 'black'){
        return(
            <div onClick={handleClick} className={styles.blackCircleButton}>
                <h3 className={styles.buttonText}>{text}</h3>
            </div>
        )
    }
    else if(shape == 'circle' && color == 'grey'){
        return(
            <div onClick={handleClick} className={styles.greyCircleButton}>
                <h3 className={styles.greyButtonText}>{text}</h3>
            </div>
        )
    }
    else if(shape ==  'rectangle'){
        return(
            <div onClick={handleClick} className={styles.rectangleButton}>
                <h3 className={styles.buttonText}>{text}</h3>
            </div>
        )
    }
    else if(shape == 'long'){
        return(
            <div onClick={handleClick} className={styles.longButton}>
                <h3 className={styles.buttonText}>{text}</h3>
            </div>
        )
    }
}

export default Button;