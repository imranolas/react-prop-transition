import {Component} from 'react';
import PropTypes from 'prop-types';
import {interpolateObject} from 'd3-interpolate';
import {timer} from 'd3-timer';
import easeMap from './easing';

export default class Transition extends Component {

  static propTypes = {
    children: PropTypes.func.isRequired,
    duration: PropTypes.number,
    easing: PropTypes.oneOf(Object.keys(easeMap)),
    props: PropTypes.object.isRequired
  }

  static defaultProps = {
    duration: 400,
    easing: 'cubicOut'
  }

  constructor(props) {
    super(props);
    this.state = {
      props: props.props
    };
    this.mounted = true;
  }

  componentWillReceiveProps(props) {
    this.timer && this.timer.stop();
    this.interpolator = interpolateObject(this.state.props, props.props);
    this.start();
  }

  componentWillUnmount = () => {
    this.mounted = false;
  }

  start = () => {
    this.timer = timer(this.animate);
  }

  animate = (elapsed) => {
    this.timer || this.start();
    const {duration, easing} = this.props;
    const t = elapsed / duration;
    let nextState;
    if(this.mounted){
      if (t > 1 ) {
        nextState = this.interpolator(1);
        this.timer.stop();
      } else {
        nextState = this.interpolator(easeMap[easing](t));
      }
      this.setState({props: nextState});
    }else{
      this.timer.stop();
    }
  }

  render() {
    const {children} = this.props;
    return children(this.state.props);
  }
}
