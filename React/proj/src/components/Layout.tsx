import * as React from 'react';
import {Component, CSSProperties} from 'react';
import Navbar from './Navbar'
import Content from './Content'
import Footer from './Footer'
import Counters from '../ShoppingCart/shoppingCart'
import {ProductData} from './ProductWidget'

export interface theShoppingCart {
    id: string,
    value: number
}

interface State {
    hideCart: boolean
    counters: Array<theShoppingCart>
}

export default class Layout extends Component <{}, State> {

    state = {
        hideCart: true,
        counters: new Array<theShoppingCart>()
    }

    render() {
        return (
            <div style={layout}>
                <Navbar handleCart={this.displayCart}/>
                {!this.state.hideCart ? <Counters
                    products={this.state.counters}
                    incrementProduct={this.incrementProduct}
                    minusProduct={this.minusProduct}
                    deleteProduct={this.deleteProduct}
                    displayCart={this.displayCart} /> : null}
                <Content onCartIconClick={this.addToTheCart}/>
                <Footer/>
            </div>
        )
    }

    displayCart = () => {
        if (this.state.hideCart === true) {
            this.setState({hideCart: false})
        } else {
            this.setState({hideCart: true})
        }
        console.log(this.state.hideCart);

    }

    addToTheCart = (selectedProduct: ProductData) => {

        let productList = this.state.counters
        let wasProductAddedToCart = false

        productList.forEach((product: theShoppingCart) => {
            if (product.id === selectedProduct.name) {
                product.value++
                wasProductAddedToCart = true
            }
        })

        if (!wasProductAddedToCart) {
            this.state.counters.push({id: selectedProduct.name, value: 1})
            alert('Product successfully added to your cart!')
        }

        this.setState({
            counters: productList
        })
    }

    incrementProduct = (id: string) => {

        let productList = this.state.counters

        productList.forEach((product: theShoppingCart) => {
            if (product.id === id) {
                product.value++
            }
        })

        this.setState({
            counters: productList
        })
    }

    minusProduct = (id: string) => {
        let productList = this.state.counters

        productList.forEach((product: theShoppingCart) => {
            if (product.id === id) {
                product.value--
            }
        })

        this.setState({
            counters: productList
        })
    }

    deleteProduct = (id: string) => {
        const counters = this.state.counters.filter(c => c.id !== id);
        this.setState({counters});
    }

}

const layout: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#e7f1fc'
}
