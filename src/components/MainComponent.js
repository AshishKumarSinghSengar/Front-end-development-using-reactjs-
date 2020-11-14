import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import '../Assets/boot/css/bootstrap.min.css';
import DishDetail from './DishDetailComponent';
import { connect } from 'react-redux';


const mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  constructor(props)
  {
    super(props);

  }

  onDishSelect(dishId)
  {
      this.setState({ SelectedDish :dishId });
  }

  render()
  {
    const HomePage=()=>{
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
         />
      );
    }

    const DishWithID=({match})=>{
      return(
        <DishDetail
         dish={this.props.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10)[0])} 
        comments={this.props.comments.filter((comments)=>Comment.dishId===parseInt(match.params.dishId,10)[0])}
        />
      );
    }

  return (
    <div className="App">
        <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishID" component={DishWithID} />
            <Route exact path="/contactus" component={Contact} />
            <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps)(Main));