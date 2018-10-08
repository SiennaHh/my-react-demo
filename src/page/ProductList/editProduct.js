import React, { Component } from 'react';

class EditProduct extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {

        }
        console.log(props)
    }
    render(){
        const productId = this.props.match.params.id;
        console.log(productId);
        return(
            <div>
                edit id={productId}
            </div>
        )
    }

}

export default EditProduct;