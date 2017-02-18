import {Component, PropTypes} from 'react';
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
  }

  componentWillReceiveProps(props) {
    this.timer && this.timer.stop();
    this.interpolator = interpolateObject(this.state.props, props.props);
    this.start();
  }

  start = () => {
    this.timer = timer(this.animate);
  }

  animate = (elapsed) => {
    this.timer || this.start();
    const {duration, easing} = this.props;
    const t = elapsed / duration;
    let nextState;
    if (t > 1) {
      nextState = this.interpolator(1);
      this.timer.stop();
    } else {
      nextState = this.interpolator(easeMap[easing](t));
    }
    this.setState({props: nextState});
  }

  render() {
    const {children} = this.props;
    return children(this.state.props);
  }
}
