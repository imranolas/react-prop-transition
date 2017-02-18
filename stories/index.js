import React, {Component} from 'react';
import { storiesOf } from '@kadira/storybook';
import Transition from '../src';
import {random} from 'lodash';
import randomColor from 'random-color';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = props.nextState();
  }

  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState(this.props.nextState());
    }, 1500);
  }

  render() {
    const el = React.cloneElement(this.props.children, {props: this.state});
    return el;
  }
}

const style = {
  fontFamily: 'Helvetica',
  textAlign: 'center',
  border: '1px solid #ddd',
  borderRadius: 5,
  fontSize: 22,
  width: 300,
  padding: 30,
  margin: '50px auto',
  boxShadow: '0 0 20px 0 rgba(0,0,0,0.1)'
};

storiesOf('Transition', module)
  .add('Number', () => (
    <Container nextState={() => ({number: random(9999)})}>
      <Transition duration={800}>
        {({number}) => <div style={style}>{number.toFixed()}</div>}
      </Transition>
    </Container>
  ))
  .add('Color', () => (
    <Container nextState={() => ({color: randomColor().rgbString()})}>
      <Transition duration={800}>
        {({color}) => <div style={{ ...style, backgroundColor: color}}>{color}</div>}
      </Transition>
    </Container>
  ));
