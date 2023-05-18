import React,{useEffect, useRef , useState} from "react";

import { FiStar,FiX } from "react-icons/fi"

export default function RatingModal({isOpen , handleModalClose ,rating ,setRating ,handlePay,cost}){ /* Only written as props (not destructured ) because to avoid errors in testing */

    /* usefull props can be passed is,
        open-> for boolean value representing modal display state
        setOpen-> for setting the state(from parent) .Tip:set this to false while closing as the next time when it is called it should open
        setRatingValue-> for setting the value in parent or you can handle the sending the rating here.
     */

    const ratingDialogRef = useRef(null);


    useEffect(
        ()=>{
            if(isOpen) {
                const dialog = ratingDialogRef.current;
                dialog.showModal()
            }else {
                const dialog = ratingDialogRef.current;
                //dialog.showModal()
                dialog.close()
            }
        },[isOpen]
    )

    //const [rating, setRating] = useState(0);
    const ratingNotActiveColor = "fill-slate-500";
    const ratingActiveColor = "fill-orange-500";
    const [starsFillColorArray,setStarsFillColorArray] = useState([ratingNotActiveColor , ratingNotActiveColor ,ratingNotActiveColor , ratingNotActiveColor ,ratingNotActiveColor ])
    const [canRatingChange , setCanRatingChange] = useState(true);

    function HandleDialogMouseOver(e){
        const value = e.currentTarget.value;

        if(true){
            setStarsFillColorArray(
                (array)=>{
                    let newArray = []
                    newArray = array.map((color,index)=>{
                        if(index <= (value-1)){
                            return ratingActiveColor;
                        }
                        else {
                            return ratingNotActiveColor;
                        }
                    })
                    return newArray;
                }
            ) 
        }
        
        
    }

    function HandleDialogMouseLeave(){
        if(canRatingChange) {
            setStarsFillColorArray(
                (array)=>{
                    let newArray = []
                    newArray = array.map((color,index)=>{
                        
                        return ratingNotActiveColor;
                       
                    })
                    return newArray;
                }
            )
        }
        else {
            setStarsFillColorArray(
                (array)=>{
                    let newArray = []
                    newArray = array.map((color,index)=>{
                        if(index <= (rating-1)){
                            return ratingActiveColor;
                        }
                        else {
                            return ratingNotActiveColor;
                        }
                    })
                    return newArray;
                }
            ) 
        }
        
    }

    function HandleDialogMouseClicked(e) {
        
        setRating(e.currentTarget.value)
        // setRating(rating)
        setCanRatingChange(false);

        const value = e.currentTarget.value;
        

        setStarsFillColorArray(
            (array)=>{
                let newArray = []
                newArray = array.map((color,index)=>{
                    if(index <= (value-1)){
                        return ratingActiveColor;
                    }
                    else {
                        return ratingNotActiveColor;
                    }
                })
                return newArray;
            }
        )

       
 
    }

    function HandleRatingSubmit(){
        const dialogNode = ratingDialogRef.current;
        dialogNode.close()
        console.log(rating,"🎯");
        handlePay();
         //TODO:send submit signal to the job giver
         // * the state setter can be passed as a prop and should be called here
    }

    function HandleDialogClose(e){

        /* set the open prop to false which is a state handled in parent  */

        setCanRatingChange(true);
        setRating(0);
        setStarsFillColorArray([ratingNotActiveColor , ratingNotActiveColor ,ratingNotActiveColor , ratingNotActiveColor ,ratingNotActiveColor ])
        const dialogNode = ratingDialogRef.current;
        handleModalClose();
        dialogNode.close()
        
    }


    return (
        <dialog ref={ratingDialogRef} className=" bottom-1/3 px-6 py-4 w-96 h-96 space-y-24 bg-amber-100 rounded-xl backdrop:bg-slate-500 backdrop:opacity-40" > 
                <FiX className=" ml-auto text-xl rounded-full bg-rose-200 p-1 hover:bg-red-500 hover:text-white" onClick={HandleDialogClose}/>
                <div className="space-y-2">
                    <p className="font-medium text-center">Rate the work</p>
                    <div className="mx-auto flex items-center space-x-2  w-fit" onMouseLeave={HandleDialogMouseLeave}>
                        <button  value="1" onMouseOver={HandleDialogMouseOver} onClick={HandleDialogMouseClicked} >
                            <FiStar className={`text-4xl stroke-none ${starsFillColorArray[0]} `}   />
                        </button>
                        <button value="2" onMouseOver={HandleDialogMouseOver} onClick={HandleDialogMouseClicked}> 
                            <FiStar className={`text-4xl stroke-none ${starsFillColorArray[1]} `}   />
                        </button>
                        <button  value="3" onMouseOver={HandleDialogMouseOver} onClick={HandleDialogMouseClicked}>
                            <FiStar className={`text-4xl stroke-none ${starsFillColorArray[2]} `}  />
                        </button>
                        <button value="4" onMouseOver={HandleDialogMouseOver} onClick={HandleDialogMouseClicked}>
                            <FiStar className={`text-4xl stroke-none ${starsFillColorArray[3]} `}   />
                        </button>
                        <button value="5" onMouseOver={HandleDialogMouseOver} onClick={HandleDialogMouseClicked}>
                            <FiStar className={`text-4xl stroke-none ${starsFillColorArray[4]} `}   />
                        </button>

                    </div>

                </div>
                


                <button 
                    className="block px-6 py-4 mx-auto mb-6 rounded-full bg-emerald-200 text-emerald-800 font-medium cursor-pointer hover:text-white hover:bg-emerald-600 disabled:bg-slate-300 disabled:text-slate-600 disabled:cursor-not-allowed"
                    onClick={HandleRatingSubmit}
                    disabled={(rating===0)?true:false}
                >Pay {cost}</button>
        </dialog>
    )

}